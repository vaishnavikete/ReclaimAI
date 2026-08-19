from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, CravingLog, DailyTask, MoodLog
from app.services.seed_data import seed_demo_data

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard_summary(user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        user = seed_demo_data(db)
    
    recent_cravings = db.query(CravingLog).filter(CravingLog.user_id == user.id).order_by(CravingLog.created_at.desc()).limit(3).all()
    tasks = db.query(DailyTask).filter(DailyTask.user_id == user.id).all()
    completed_tasks = [t for t in tasks if t.completed]
    latest_mood = db.query(MoodLog).filter(MoodLog.user_id == user.id).order_by(MoodLog.created_at.desc()).first()

    return {
        "user_name": user.name,
        "recovery_streak": user.recovery_streak,
        "total_saved": user.total_saved,
        "risk_level": user.risk_level,
        "risk_score": user.risk_score,
        "xp": user.xp,
        "today_mood": latest_mood.mood_type if latest_mood else "Good",
        "completed_tasks_count": len(completed_tasks),
        "total_tasks_count": len(tasks),
        "recent_cravings": [
            {
                "id": c.id,
                "trigger": c.trigger,
                "intensity_before": c.intensity_before,
                "intensity_after": c.intensity_after,
                "created_at": c.created_at.strftime("%b %d, %H:%M")
            } for c in recent_cravings
        ],
        "today_task": tasks[0].title if tasks else "Complete a 10-minute breathing session"
    }