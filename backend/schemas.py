from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class TrafficPredictionRequest(BaseModel):
    origin: str
    destination: str
    travel_time: Optional[str] = "now"

class TrafficPredictionResponse(BaseModel):
    id: int
    origin: str
    destination: str
    travel_time: str
    prediction_data: dict
    confidence_score: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class RouteOption(BaseModel):
    name: str
    distance: str
    current_traffic: str
    predicted_traffic: str
    eta: str
    predicted_eta: str
    confidence: str

class TrafficForecast(BaseModel):
    time: str
    traffic: int
    predicted: int

class TrafficAnalysis(BaseModel):
    forecast_data: List[TrafficForecast]
    route_options: List[RouteOption]

class DeparturePlanRequest(BaseModel):
    origin: str
    destination: str
    target_arrival_time: datetime

class DeparturePlanResponse(BaseModel):
    id: int
    origin: str
    destination: str
    target_arrival_time: datetime
    recommended_departure_time: datetime
    traffic_conditions: dict
    confidence_score: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class ParkingSpot(BaseModel):
    id: int
    name: str
    address: str
    distance: float
    available_spots: int
    total_spots: int
    price_per_hour: float
    rating: Optional[float] = None

class ParkingSearchRequest(BaseModel):
    location: str
    search_radius: Optional[float] = 5.0

class ParkingSearchResponse(BaseModel):
    id: int
    location: str
    search_radius: float
    available_spots: int
    pricing_info: dict
    parking_data: List[ParkingSpot]
    created_at: datetime
    
    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    traffic_prediction_accuracy: str
    average_time_saved: str
    parking_success_rate: str
    active_routes: str

class TrafficStatus(BaseModel):
    area: str
    status: str
    time: str
    delay: str

class DashboardResponse(BaseModel):
    stats: DashboardStats
    traffic_status: List[TrafficStatus]

class MLModelRequest(BaseModel):
    model_type: str
    input_data: dict

class MLModelResponse(BaseModel):
    prediction: dict
    confidence: float
    processing_time: float
