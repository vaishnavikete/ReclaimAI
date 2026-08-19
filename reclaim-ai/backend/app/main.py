from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.routers import auth, assessment, dashboard, craving, chat, tasks, mood, finance, risk, monitoring, support
from app.services.seed_data import seed_demo_data

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="ReClaim AI — AI Gambling Addiction Recovery Companion API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()

# Include Routers
app.include_router(auth.router)
app.include_router(assessment.router)
app.include_router(dashboard.router)
app.include_router(craving.router)
app.include_router(chat.router)
app.include_router(tasks.router)
app.include_router(mood.router)
app.include_router(finance.router)
app.include_router(risk.router)
app.include_router(monitoring.router)
app.include_router(support.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "ReClaim AI API",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }