from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, CravingLog
from app.schemas import CravingCreate, CravingResponse

router = APIRouter(prefix="/api/craving", tags=["Craving"])

@router.post("/log", response_model=CravingResponse)
def log_craving(data: CravingCreate, user_id: int = 1, db: Session = Depends(get_db)):
    craving = CravingLog(
        user_id=user_id,
        intensity_before=data.intensity_before,
        intensity_after=data.intensity_after,
        trigger=data.trigger,
        notes=data.notes,
        intervention_completed=True
    )
    db.add(craving)
    
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.xp += 30
    
    db.commit()
    db.refresh(craving)
    return craving

@router.get("/history", response_model=List[CravingResponse])
def get_craving_history(user_id: int = 1, db: Session = Depends(get_db)):
    return db.query(CravingLog).filter(CravingLog.user_id == user_id).order_by(CravingLog.created_at.desc()).all()