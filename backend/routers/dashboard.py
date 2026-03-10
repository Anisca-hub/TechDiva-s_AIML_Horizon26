from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas import DashboardStats, TrafficStatus, DashboardResponse
import random

router = APIRouter()

@router.get("/stats", response_model=DashboardResponse)
async def get_dashboard_stats(db: Session = Depends(get_db)):
    stats = DashboardStats(
        traffic_prediction_accuracy=f"{random.uniform(90, 96):.1f}%",
        average_time_saved=f"{random.randint(15, 30)} min",
        parking_success_rate=f"{random.uniform(85, 92):.1f}%",
        active_routes=f"{random.randint(1000, 2000):,}"
    )
    
    traffic_status = [
        TrafficStatus(
            area="Bandra-Worli Sea Link",
            status="heavy",
            time="45 min",
            delay="+15 min"
        ),
        TrafficStatus(
            area="Western Express Highway",
            status="moderate",
            time="28 min",
            delay="+5 min"
        ),
        TrafficStatus(
            area="Eastern Express Highway",
            status="light",
            time="18 min",
            delay="On time"
        ),
        TrafficStatus(
            area="Sion-Panvel Highway",
            status="heavy",
            time="38 min",
            delay="+12 min"
        )
    ]
    
    return DashboardResponse(
        stats=stats,
        traffic_status=traffic_status
    )
