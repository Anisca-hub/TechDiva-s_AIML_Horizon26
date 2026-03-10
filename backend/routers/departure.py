from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from database import get_db, DeparturePlan, User
from schemas import DeparturePlanRequest, DeparturePlanResponse
from auth import get_current_user
import random

router = APIRouter()

def calculate_optimal_departure(target_arrival: datetime, origin: str, destination: str):
    base_travel_time = random.randint(20, 60)
    traffic_delay = random.randint(0, 20)
    total_time = base_travel_time + traffic_delay
    
    optimal_departure = target_arrival - timedelta(minutes=total_time)
    
    traffic_conditions = {
        "current_traffic": random.choice(["Light", "Moderate", "Heavy"]),
        "predicted_traffic": random.choice(["Light", "Moderate", "Heavy"]),
        "base_travel_time": base_travel_time,
        "traffic_delay": traffic_delay,
        "total_time": total_time
    }
    
    return optimal_departure, traffic_conditions

@router.post("/plan", response_model=DeparturePlanResponse)
async def plan_departure(
    request: DeparturePlanRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not request.origin or not request.destination:
        raise HTTPException(status_code=400, detail="Origin and destination are required")
    
    if request.target_arrival_time <= datetime.now():
        raise HTTPException(status_code=400, detail="Target arrival time must be in the future")
    
    recommended_departure, traffic_conditions = calculate_optimal_departure(
        request.target_arrival_time,
        request.origin,
        request.destination
    )
    
    departure_plan = DeparturePlan(
        user_id=current_user.id,
        origin=request.origin,
        destination=request.destination,
        target_arrival_time=request.target_arrival_time,
        recommended_departure_time=recommended_departure,
        traffic_conditions=traffic_conditions,
        confidence_score=random.uniform(0.80, 0.95)
    )
    
    db.add(departure_plan)
    db.commit()
    db.refresh(departure_plan)
    
    return departure_plan

@router.get("/history", response_model=list[DeparturePlanResponse])
async def get_departure_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    plans = db.query(DeparturePlan).filter(
        DeparturePlan.user_id == current_user.id
    ).order_by(DeparturePlan.created_at.desc()).limit(10).all()
    
    return plans
