from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models import User, ChatMessage
from app.schemas import ChatRequest, ChatResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/api/chat", tags=["AI Chatbot"])

@router.post("/send", response_model=ChatResponse)
def send_chat_message(request: ChatRequest, user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    context = {
        "streak": user.recovery_streak if user else 12,
        "risk_level": user.risk_level if user else "LOW"
    }

    user_msg = ChatMessage(
        user_id=user_id,
        sender="user",
        content=request.message,
        quick_action=request.quick_action
    )
    db.add(user_msg)
    
    ai_result = AIService.generate_recovery_response(
        prompt=request.message,
        user_context=context,
        quick_action=request.quick_action
    )

    ai_msg = ChatMessage(
        user_id=user_id,
        sender="ai",
        content=ai_result["response"],
        quick_action=ai_result.get("action_suggestion")
    )
    db.add(ai_msg)
    db.commit()

    return ChatResponse(
        response=ai_result["response"],
        action_suggestion=ai_result.get("action_suggestion"),
        timestamp=datetime.utcnow()
    )

@router.get("/history")
def get_chat_history(user_id: int = 1, db: Session = Depends(get_db)):
    messages = db.query(ChatMessage).filter(ChatMessage.user_id == user_id).order_by(ChatMessage.created_at.asc()).all()
    if not messages:
        return [
            {
                "sender": "ai",
                "content": "Hello! I'm your ReClaim AI Recovery Companion. I'm here 24/7 to support you without judgment. How are you feeling today?",
                "quick_action": None,
                "timestamp": datetime.utcnow()
            }
        ]
    return [
        {
            "sender": m.sender,
            "content": m.content,
            "quick_action": m.quick_action,
            "timestamp": m.created_at
        } for m in messages
    ]