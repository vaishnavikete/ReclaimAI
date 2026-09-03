from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin, UserResponse, Token
from app.services.seed_data import seed_demo_data

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=user_data.password,
        recovery_streak=1,
        total_saved=500.0,
        xp=50
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "access_token": f"token_{user.id}",
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "access_token": f"token_{user.id}",
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@router.get("/judge-demo", response_model=Token)
def judge_demo(db: Session = Depends(get_db)):
    """
    1-Click Judge Demo endpoint. Auto-seeds and returns Rahul's demo profile.
    """
    demo_user = seed_demo_data(db)
    return {
        "access_token": f"token_{demo_user.id}",
        "token_type": "bearer",
        "user": UserResponse.from_orm(demo_user)
    }