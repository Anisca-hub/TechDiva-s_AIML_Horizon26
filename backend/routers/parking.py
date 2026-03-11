from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, ParkingSearch, User
from schemas import ParkingSearchRequest, ParkingSearchResponse, ParkingSpot
from auth import get_current_user
import random

router = APIRouter()

def generate_parking_spots(location: str, search_radius: float):
    parking_names = [
        "Central Parking Complex",
        "City Center Garage",
        "Metro Station Parking",
        "Shopping Mall Parking",
        "Street Parking Zone A",
        "Office Building Parking"
    ]
    
    spots = []
    for i, name in enumerate(parking_names):
        total_spots = random.randint(50, 500)
        available = random.randint(0, total_spots)
        
        spots.append(ParkingSpot(
            id=i + 1,
            name=name,
            address=f"{random.randint(100, 999)} {location} Street",
            distance=round(random.uniform(0.1, search_radius), 1),
            available_spots=available,
            total_spots=total_spots,
            price_per_hour=round(random.uniform(5, 25), 2),
            rating=round(random.uniform(3.0, 5.0), 1) if random.random() > 0.3 else None
        ))
    
    return sorted(spots, key=lambda x: x.distance)

@router.post("/search", response_model=ParkingSearchResponse)
async def search_parking(
    request: ParkingSearchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not request.location:
        raise HTTPException(status_code=400, detail="Location is required")
    
    parking_spots = generate_parking_spots(request.location, request.search_radius)
    total_available = sum(spot.available_spots for spot in parking_spots)
    
    pricing_info = {
        "min_price_per_hour": min(spot.price_per_hour for spot in parking_spots),
        "max_price_per_hour": max(spot.price_per_hour for spot in parking_spots),
        "average_price_per_hour": round(sum(spot.price_per_hour for spot in parking_spots) / len(parking_spots), 2)
    }
    
    parking_search = ParkingSearch(
        user_id=current_user.id,
        location=request.location,
        search_radius=request.search_radius,
        available_spots=total_available,
        pricing_info=str(pricing_info),
        parking_data=str([spot.dict() for spot in parking_spots])
    )
    
    db.add(parking_search)
    db.commit()
    db.refresh(parking_search)
    
    return ParkingSearchResponse(
        id=parking_search.id,
        location=request.location,
        search_radius=request.search_radius,
        available_spots=total_available,
        pricing_info=pricing_info,
        parking_data=parking_spots,
        created_at=parking_search.created_at
    )

@router.get("/history", response_model=list[ParkingSearchResponse])
async def get_parking_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    searches = db.query(ParkingSearch).filter(
        ParkingSearch.user_id == current_user.id
    ).order_by(ParkingSearch.created_at.desc()).limit(10).all()
    
    result = []
    for search in searches:
        import ast
        parking_data = ast.literal_eval(search.parking_data) if search.parking_data else []
        pricing_info = ast.literal_eval(search.pricing_info) if search.pricing_info else {}
        
        spots = [ParkingSpot(**spot) for spot in parking_data]
        
        result.append(ParkingSearchResponse(
            id=search.id,
            location=search.location,
            search_radius=search.search_radius,
            available_spots=search.available_spots,
            pricing_info=pricing_info,
            parking_data=spots,
            created_at=search.created_at
        ))
    
    return result
