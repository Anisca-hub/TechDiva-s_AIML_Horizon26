from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, User
from schemas import MLModelRequest, MLModelResponse
from auth import get_current_user
import time
import random

router = APIRouter()

def mock_traffic_prediction(input_data):
    time.sleep(0.5)
    
    origin = input_data.get("origin", "")
    destination = input_data.get("destination", "")
    
    base_confidence = random.uniform(0.75, 0.95)
    
    prediction = {
        "traffic_level": random.randint(1, 10),
        "congestion": random.choice(["Low", "Medium", "High"]),
        "estimated_travel_time": random.randint(15, 90),
        "alternative_routes": random.randint(1, 3),
        "optimal_departure_time": f"{random.randint(6, 22)}:{random.randint(0, 59):02d}",
        "weather_impact": random.choice(["None", "Light", "Moderate", "Heavy"]),
        "events_impact": random.choice(["None", "Low", "Medium", "High"])
    }
    
    return prediction, base_confidence

def mock_parking_prediction(input_data):
    time.sleep(0.3)
    
    location = input_data.get("location", "")
    radius = input_data.get("radius", 5.0)
    
    prediction = {
        "available_spots": random.randint(10, 200),
        "occupancy_rate": random.uniform(0.3, 0.9),
        "peak_hours": [f"{h}:00" for h in random.sample(range(8, 20), 3)],
        "average_price": round(random.uniform(5, 30), 2),
        "walking_distance": round(random.uniform(1, 10), 1),
        "street_parking_available": random.choice([True, False])
    }
    
    return prediction, random.uniform(0.70, 0.90)

@router.post("/predict", response_model=MLModelResponse)
async def make_prediction(
    request: MLModelRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    start_time = time.time()
    
    if request.model_type == "traffic":
        prediction, confidence = mock_traffic_prediction(request.input_data)
    elif request.model_type == "parking":
        prediction, confidence = mock_parking_prediction(request.input_data)
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported model type: {request.model_type}"
        )
    
    processing_time = time.time() - start_time
    
    return MLModelResponse(
        prediction=prediction,
        confidence=confidence,
        processing_time=processing_time
    )

@router.get("/models")
async def get_available_models():
    return {
        "available_models": [
            {
                "name": "traffic",
                "description": "Traffic prediction and congestion analysis",
                "version": "1.0.0",
                "status": "active"
            },
            {
                "name": "parking",
                "description": "Parking availability prediction",
                "version": "1.0.0", 
                "status": "active"
            }
        ]
    }
