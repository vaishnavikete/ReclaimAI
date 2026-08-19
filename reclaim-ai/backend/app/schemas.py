from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    recovery_streak: int
    total_saved: float
    xp: int
    risk_level: str
    risk_score: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Assessment Schemas
class AssessmentCreate(BaseModel):
    frequency: str
    avg_spend: float
    primary_trigger: str
    gambles_when_stressed: bool
    chases_losses: bool
    academic_work_impact: bool
    relationship_impact: bool
    urge_strength: int

class AssessmentResponse(BaseModel):
    id: int
    risk_level: str
    score: int
    plan_summary: str

    class Config:
        from_attributes = True

# Craving Schemas
class CravingCreate(BaseModel):
    intensity_before: int
    intensity_after: Optional[int] = None
    trigger: str
    notes: Optional[str] = None

class CravingResponse(BaseModel):
    id: int
    intensity_before: int
    intensity_after: Optional[int]
    trigger: str
    created_at: datetime

    class Config:
        from_attributes = True

# Task Schemas
class TaskToggle(BaseModel):
    task_id: int
    completed: bool

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    xp_reward: int
    completed: bool
    date_assigned: str

    class Config:
        from_attributes = True

# Mood Schemas
class MoodCreate(BaseModel):
    mood_type: str
    urge_level: int
    notes: Optional[str] = None

class MoodResponse(BaseModel):
    id: int
    mood_type: str
    urge_level: int
    created_at: datetime

    class Config:
        from_attributes = True

# Chat Schemas
class ChatRequest(BaseModel):
    message: str
    quick_action: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    action_suggestion: Optional[str] = None
    timestamp: datetime

# Financial Schemas
class FinancialCalcRequest(BaseModel):
    daily_spend: float
    goal_name: Optional[str] = "Tech Laptop & Skill Courses"
    goal_cost: Optional[float] = 60000.0

class FinancialCalcResponse(BaseModel):
    daily_spend: float
    monthly_spend: float
    yearly_spend: float
    five_year_spend: float
    goal_name: str
    months_to_achieve_goal: float
    alternative_items: List[dict]

# Support Contact Schemas
class SupportContactCreate(BaseModel):
    name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    notify_on_craving: bool = True

class SupportContactResponse(BaseModel):
    id: int
    name: str
    relationship: str
    phone: str
    email: Optional[str]
    notify_on_craving: bool

    class Config:
        from_attributes = True