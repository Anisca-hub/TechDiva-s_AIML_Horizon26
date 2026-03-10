from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
from database import engine, Base
from routers import dashboard, traffic, departure, parking, users, ml_models

security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="TechDiva Urban Navigation API",
    description="AI-powered urban mobility optimization platform backend",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(traffic.router, prefix="/api/traffic", tags=["traffic"])
app.include_router(departure.router, prefix="/api/departure", tags=["departure"])
app.include_router(parking.router, prefix="/api/parking", tags=["parking"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(ml_models.router, prefix="/api/ml", tags=["ml-models"])

@app.get("/")
async def root():
    return {"message": "TechDiva Urban Navigation API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TechDiva API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
