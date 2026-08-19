from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ActivityLog

router = APIRouter(prefix="/api/monitoring", tags=["Gambling Monitoring Demo"])

@router.get("/summary")
def get_monitoring_summary(user_id: int = 1, db: Session = Depends(get_db)):
    return {
        "disclaimer": "Monitoring is opt-in. ReClaim AI does not secretly access private device activity.",
        "opt_in_status": True,
        "today_detections": 3,
        "weekly_breakdown": [
            {"day": "Monday", "attempts": 2},
            {"day": "Tuesday", "attempts": 5},
            {"day": "Wednesday", "attempts": 1},
            {"day": "Thursday", "attempts": 4},
            {"day": "Friday", "attempts": 2},
            {"day": "Saturday", "attempts": 0},
            {"day": "Sunday", "attempts": 1},
        ],
        "recent_logs": [
            {"type": "App Launch Intercepted", "target": "Fantasy Sports Platform", "time": "2 hours ago", "status": "Prevented"},
            {"type": "Web Visit Warning", "target": "Online Casino Domain", "time": "Yesterday, 23:15", "status": "Intervened"},
            {"type": "High Urge Window", "target": "Late Night Usage Pattern", "time": "3 days ago, 01:30", "status": "Breathing Exercise Triggered"},
        ]
    }