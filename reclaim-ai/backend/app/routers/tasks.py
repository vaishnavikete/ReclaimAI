from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, DailyTask
from app.schemas import TaskResponse, TaskToggle

router = APIRouter(prefix="/api/tasks", tags=["Daily Tasks & Gamification"])

@router.get("/", response_model=List[TaskResponse])
def get_daily_tasks(user_id: int = 1, db: Session = Depends(get_db)):
    tasks = db.query(DailyTask).filter(DailyTask.user_id == user_id).all()
    if not tasks:
        default_list = [
            DailyTask(user_id=user_id, title="15-Minute Outdoor Walk", description="Clear your mind & boost natural dopamine.", category="Health", xp_reward=20, completed=False, date_assigned="Today"),
            DailyTask(user_id=user_id, title="10-Minute Box Breathing", description="Calm the nervous system and manage urges.", category="Mindfulness", xp_reward=20, completed=False, date_assigned="Today"),
            DailyTask(user_id=user_id, title="Review Financial Reality", description="Track money saved by staying gambling-free.", category="Finance", xp_reward=30, completed=False, date_assigned="Today"),
            DailyTask(user_id=user_id, title="Gratitude Journaling", description="Write down 3 things you appreciate today.", category="Mindset", xp_reward=20, completed=False, date_assigned="Today"),
            DailyTask(user_id=user_id, title="Talk to a Trusted Friend", description="Share your positive daily win.", category="Social", xp_reward=50, completed=False, date_assigned="Today"),
        ]
        db.add_all(default_list)
        db.commit()
        tasks = default_list
    return tasks

@router.post("/toggle")
def toggle_task(data: TaskToggle, user_id: int = 1, db: Session = Depends(get_db)):
    task = db.query(DailyTask).filter(DailyTask.id == data.task_id, DailyTask.user_id == user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.completed = data.completed
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        if data.completed:
            user.xp += task.xp_reward
        else:
            user.xp = max(0, user.xp - task.xp_reward)
    
    db.commit()
    return {"message": "Task updated", "completed": task.completed, "total_xp": user.xp if user else 0}

@router.get("/badges")
def get_user_badges(user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    streak = user.recovery_streak if user else 12
    xp = user.xp if user else 480
    saved = user.total_saved if user else 6000.0

    return [
        {"title": "First Step", "description": "Joined ReClaim AI Recovery", "unlocked": True, "icon": "Footprints"},
        {"title": "7-Day Fighter", "description": "7 Days Gambling-Free", "unlocked": streak >= 7, "icon": "ShieldCheck"},
        {"title": "30-Day Champion", "description": "30 Days Gambling-Free", "unlocked": streak >= 30, "icon": "Trophy"},
        {"title": "Money Saver", "description": "Saved over ₹5,000", "unlocked": saved >= 5000, "icon": "IndianRupee"},
        {"title": "Craving Crusher", "description": "Completed 3 urge interventions", "unlocked": xp >= 300, "icon": "Zap"},
    ]