from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./techdiva.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    traffic_predictions = relationship("TrafficPrediction", back_populates="user")
    departure_plans = relationship("DeparturePlan", back_populates="user")
    parking_searches = relationship("ParkingSearch", back_populates="user")

class TrafficPrediction(Base):
    __tablename__ = "traffic_predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    travel_time = Column(String)
    prediction_data = Column(Text)
    confidence_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="traffic_predictions")

class DeparturePlan(Base):
    __tablename__ = "departure_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    target_arrival_time = Column(DateTime)
    recommended_departure_time = Column(DateTime)
    traffic_conditions = Column(Text)
    confidence_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="departure_plans")

class ParkingSearch(Base):
    __tablename__ = "parking_searches"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    location = Column(String, nullable=False)
    search_radius = Column(Float)
    available_spots = Column(Integer)
    pricing_info = Column(Text)
    parking_data = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="parking_searches")

class TrafficData(Base):
    __tablename__ = "traffic_data"
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False, index=True)
    traffic_level = Column(Integer)
    speed = Column(Float)
    congestion_level = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class ParkingData(Base):
    __tablename__ = "parking_data"
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    total_spots = Column(Integer)
    available_spots = Column(Integer)
    price_per_hour = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
