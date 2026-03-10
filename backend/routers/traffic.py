from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from database import get_db, TrafficPrediction, User
from schemas import TrafficPredictionRequest, TrafficPredictionResponse, TrafficAnalysis, RouteOption, TrafficForecast
from auth import get_current_user
import random

router = APIRouter()

def generate_traffic_forecast():
    hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00']
    forecast = []
    for hour in hours:
        base_traffic = random.randint(40, 100)
        forecast.append(TrafficForecast(
            time=hour,
            traffic=base_traffic,
            predicted=max(20, base_traffic - random.randint(0, 10))
        ))
    return forecast

def generate_route_options():
    return [
        RouteOption(
            name="Route 1: Via Western Express Highway",
            distance="18.5 km",
            current_traffic="Heavy",
            predicted_traffic="Moderate",
            eta="45 min",
            predicted_eta="38 min",
            confidence="94%"
        ),
        RouteOption(
            name="Route 2: Via Link Road",
            distance="22.3 km",
            current_traffic="Moderate",
            predicted_traffic="Light",
            eta="52 min",
            predicted_eta="42 min",
            confidence="87%"
        ),
        RouteOption(
            name="Route 3: Via SV Road",
            distance="19.8 km",
            current_traffic="Light",
            predicted_traffic="Light",
            eta="48 min",
            predicted_eta="45 min",
            confidence="91%"
        )
    ]

@router.post("/predict", response_model=TrafficAnalysis)
async def predict_traffic(
    request: TrafficPredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not request.origin or not request.destination:
        raise HTTPException(status_code=400, detail="Origin and destination are required")
    
    forecast_data = generate_traffic_forecast()
    route_options = generate_route_options()
    
    prediction_record = TrafficPrediction(
        user_id=current_user.id,
        origin=request.origin,
        destination=request.destination,
        travel_time=request.travel_time,
        prediction_data={"forecast": [f.dict() for f in forecast_data], "routes": [r.dict() for r in route_options]},
        confidence_score=random.uniform(0.85, 0.95)
    )
    
    db.add(prediction_record)
    db.commit()
    
    return TrafficAnalysis(
        forecast_data=forecast_data,
        route_options=route_options
    )

@router.get("/history", response_model=list[TrafficPredictionResponse])
async def get_traffic_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    predictions = db.query(TrafficPrediction).filter(
        TrafficPrediction.user_id == current_user.id
    ).order_by(TrafficPrediction.created_at.desc()).limit(10).all()
    
    return predictions
