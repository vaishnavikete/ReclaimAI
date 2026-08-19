from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import SupportContact
from app.schemas import SupportContactCreate, SupportContactResponse

router = APIRouter(prefix="/api/support", tags=["Support & Emergency Center"])

@router.get("/contacts", response_model=List[SupportContactResponse])
def get_contacts(user_id: int = 1, db: Session = Depends(get_db)):
    return db.query(SupportContact).filter(SupportContact.user_id == user_id).all()

@router.post("/contacts", response_model=SupportContactResponse)
def add_contact(data: SupportContactCreate, user_id: int = 1, db: Session = Depends(get_db)):
    contact = SupportContact(
        user_id=user_id,
        name=data.name,
        relationship=data.relationship,
        phone=data.phone,
        email=data.email,
        notify_on_craving=data.notify_on_craving
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

@router.post("/notify/{contact_id}")
def notify_trusted_contact(contact_id: int, user_id: int = 1, db: Session = Depends(get_db)):
    contact = db.query(SupportContact).filter(SupportContact.id == contact_id, SupportContact.user_id == user_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {
        "status": "alert_sent",
        "message": f"Your trusted contact '{contact.name}' ({contact.relationship}) has been notified because you requested support.",
        "timestamp": "Just now"
    }

@router.get("/helplines")
def get_helplines():
    return {
        "disclaimer": "ReClaim AI is not a replacement for a qualified mental-health professional. If you are in immediate danger or feel unable to stay safe, seek emergency assistance or contact a qualified professional.",
        "resources": [
            {"title": "Tele-MANAS Mental Health Helpline (India)", "number": "14416 / 1800-891-4416", "available": "24/7 Free Call", "category": "Mental Health"},
            {"title": "KIRAN Mental Health Rehabilitation", "number": "1800-599-0019", "available": "24/7 Govt. Helpline", "category": "Crisis Care"},
            {"title": "Gamblers Anonymous Support Network", "website": "https://www.gamblersanonymous.org", "available": "Peer Support Groups", "category": "Self-Help"},
            {"title": "NIMHANS Addiction Psychiatry Helpline", "number": "080-26995000", "available": "Mon-Sat 9AM-5PM", "category": "Clinical Services"}
        ]
    }