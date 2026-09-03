from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Assessment
from app.schemas import AssessmentCreate, AssessmentResponse

router = APIRouter(prefix="/api/assessment", tags=["Assessment"])

@router.post("/", response_model=AssessmentResponse)
def create_assessment(data: AssessmentCreate, user_id: int = 1, db: Session = Depends(get_db)):
    score = 10
    if data.frequency in ["Daily", "Multiple times a day"]:
        score += 25
    elif data.frequency in ["2-3 times a week"]:
        score += 15
    
    if data.avg_spend > 1000:
        score += 20
    elif data.avg_spend > 200:
        score += 10
    
    if data.gambles_when_stressed:
        score += 15
    if data.chases_losses:
        score += 15
    if data.academic_work_impact:
        score += 10
    if data.relationship_impact:
        score += 10
    
    score = min(score + (data.urge_strength * 2), 100)

    if score <= 30:
        risk_level = "LOW"
    elif score <= 70:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"

    plan_summary = f"Custom Recovery Plan for {risk_level} Risk Level: Focus on trigger management ({data.primary_trigger}), daily mindfulness tasks, and 10-minute urge delay techniques."

    assessment = Assessment(
        user_id=user_id,
        frequency=data.frequency,
        avg_spend=data.avg_spend,
        primary_trigger=data.primary_trigger,
        gambles_when_stressed=data.gambles_when_stressed,
        chases_losses=data.chases_losses,
        academic_work_impact=data.academic_work_impact,
        relationship_impact=data.relationship_impact,
        urge_strength=data.urge_strength,
        risk_level=risk_level,
        score=score,
        plan_summary=plan_summary
    )
    db.add(assessment)

    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.risk_level = risk_level
        user.risk_score = score
    
    db.commit()
    db.refresh(assessment)
    return assessment