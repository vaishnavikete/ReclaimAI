from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, CravingLog, DailyTask, ActivityLog

router = APIRouter(prefix="/api/risk", tags=["Relapse Risk Engine"])

@router.get("/")
def get_relapse_risk_analysis(user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    cravings = db.query(CravingLog).filter(CravingLog.user_id == user_id).all()
    tasks = db.query(DailyTask).filter(DailyTask.user_id == user_id).all()

    streak = user.recovery_streak if user else 12
    completed_tasks = [t for t in tasks if t.completed]
    task_rate = (len(completed_tasks) / len(tasks)) * 100 if tasks else 80

    risk_score = 34
    level = "LOW"

    risk_factors = [
        {"title": "Frequent Late-Night Cravings", "impact": "+12 pts", "type": "warning"},
        {"title": "Simulated Betting App Open Attempt", "impact": "+8 pts", "type": "warning"},
        {"title": "Recent Financial Loss Stress Trigger", "impact": "+10 pts", "type": "warning"},
    ]

    protective_factors = [
        {"title": f"{streak}-Day Active Recovery Streak", "impact": "-25 pts", "type": "positive"},
        {"title": f"{int(task_rate)}% Daily Recovery Task Completion", "impact": "-15 pts", "type": "positive"},
        {"title": "Active Support Contact Registered", "impact": "-10 pts", "type": "positive"},
        {"title": "Regular 10-Minute Breathing Exercises", "impact": "-10 pts", "type": "positive"},
    ]

    recommendations = [
        "Enable 10-Minute Delay Rule whenever late-night boredom strikes.",
        "Set an automatic daily spending reminder to visualize your ₹6,000 saved.",
        "Keep your trusted contact informed when urge intensity reaches >7."
    ]

    return {
        "score": risk_score,
        "level": level,
        "disclaimer": "Screening indicator for behavioral support, not a clinical medical prediction.",
        "risk_factors": risk_factors,
        "protective_factors": protective_factors,
        "recommendations": recommendations
    }