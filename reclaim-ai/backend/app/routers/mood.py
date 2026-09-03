from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import MoodLog
from app.schemas import MoodCreate, MoodResponse

router = APIRouter(prefix="/api/mood", tags=["Mood Tracker"])

@router.post("/log", response_model=MoodResponse)
def log_mood(data: MoodCreate, user_id: int = 1, db: Session = Depends(get_db)):
    mood = MoodLog(
        user_id=user_id,
        mood_type=data.mood_type,
        urge_level=data.urge_level,
        notes=data.notes
    )
    db.add(mood)
    db.commit()
    db.refresh(mood)
    return mood

@router.get("/history", response_model=List[MoodResponse])
def get_mood_history(user_id: int = 1, db: Session = Depends(get_db)):
    return db.query(MoodLog).filter(MoodLog.user_id == user_id).order_by(MoodLog.created_at.desc()).all()