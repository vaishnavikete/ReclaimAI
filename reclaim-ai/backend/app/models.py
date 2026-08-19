from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    recovery_streak = Column(Integer, default=0)
    total_saved = Column(Float, default=0.0)
    xp = Column(Integer, default=0)
    risk_level = Column(String, default="LOW")
    risk_score = Column(Integer, default=20)
    created_at = Column(DateTime, default=datetime.utcnow)

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    frequency = Column(String)
    avg_spend = Column(Float)
    primary_trigger = Column(String)
    gambles_when_stressed = Column(Boolean, default=False)
    chases_losses = Column(Boolean, default=False)
    academic_work_impact = Column(Boolean, default=False)
    relationship_impact = Column(Boolean, default=False)
    urge_strength = Column(Integer, default=5)
    risk_level = Column(String, default="MEDIUM")
    score = Column(Integer, default=50)
    plan_summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class CravingLog(Base):
    __tablename__ = "craving_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    intensity_before = Column(Integer)
    intensity_after = Column(Integer, nullable=True)
    trigger = Column(String)
    notes = Column(Text, nullable=True)
    intervention_completed = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DailyTask(Base):
    __tablename__ = "daily_tasks"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    category = Column(String, default="Habit")
    xp_reward = Column(Integer, default=20)
    completed = Column(Boolean, default=False)
    date_assigned = Column(String)

class MoodLog(Base):
    __tablename__ = "mood_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mood_type = Column(String)
    urge_level = Column(Integer, default=1)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FinancialRecord(Base):
    __tablename__ = "financial_records"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    daily_spend = Column(Float, default=500.0)
    monthly_spend = Column(Float, default=15000.0)
    yearly_spend = Column(Float, default=182500.0)
    goal_name = Column(String, default="Laptop & Skill Courses")
    goal_cost = Column(Float, default=60000.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sender = Column(String)
    content = Column(Text)
    quick_action = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SupportContact(Base):
    __tablename__ = "support_contacts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    relationship = Column(String)
    phone = Column(String)
    email = Column(String, nullable=True)
    notify_on_craving = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    activity_type = Column(String)
    detail = Column(String)
    attempts_count = Column(Integer, default=1)
    timestamp = Column(DateTime, default=datetime.utcnow)