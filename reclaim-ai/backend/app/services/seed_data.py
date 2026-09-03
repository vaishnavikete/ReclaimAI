from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models import User, Assessment, CravingLog, DailyTask, MoodLog, FinancialRecord, SupportContact, ActivityLog

def seed_demo_data(db: Session):
    # Check if demo user already exists
    demo_user = db.query(User).filter(User.email == "demo@reclaim.ai").first()
    if not demo_user:
        demo_user = User(
            name="Rahul Sharma",
            email="demo@reclaim.ai",
            hashed_password="demo_hashed_pass",
            recovery_streak=12,
            total_saved=6000.0,
            xp=480,
            risk_level="LOW",
            risk_score=34
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)

        # 1. Assessment Screening Data
        assessment = Assessment(
            user_id=demo_user.id,
            frequency="2-3 times a week",
            avg_spend=500.0,
            primary_trigger="Stress & Financial Loss Recovery",
            gambles_when_stressed=True,
            chases_losses=True,
            academic_work_impact=True,
            relationship_impact=False,
            urge_strength=4,
            risk_level="LOW",
            score=34,
            plan_summary="Personalized 30-Day Recovery Plan: Daily mindfulness, financial spending caps, and instant 10-min urge intervention exercises."
        )
        db.add(assessment)

        # 2. Daily Recovery Tasks
        tasks = [
            DailyTask(user_id=demo_user.id, title="15-Minute Outdoor Walk", description="Clear your mind and boost dopamine naturally.", category="Health", xp_reward=20, completed=True, date_assigned="Today"),
            DailyTask(user_id=demo_user.id, title="10-Minute Box Breathing", description="Calm the nervous system and lower urge intensity.", category="Mindfulness", xp_reward=20, completed=True, date_assigned="Today"),
            DailyTask(user_id=demo_user.id, title="Review Financial Reality", description="Check how much money you saved by not gambling today.", category="Finance", xp_reward=30, completed=True, date_assigned="Today"),
            DailyTask(user_id=demo_user.id, title="Gratitude Journaling", description="Write down 3 things you appreciate today.", category="Mindset", xp_reward=20, completed=False, date_assigned="Today"),
            DailyTask(user_id=demo_user.id, title="Call a Trusted Friend", description="Share your recovery progress with someone who cares.", category="Social", xp_reward=50, completed=False, date_assigned="Today"),
        ]
        db.add_all(tasks)

        # 3. Craving Interventions History
        cravings = [
            CravingLog(user_id=demo_user.id, intensity_before=8, intensity_after=3, trigger="Late Night Boredom", notes="Used 10-min breathing exercise and craving intensity dropped by 5 points.", intervention_completed=True, created_at=datetime.utcnow() - timedelta(days=2)),
            CravingLog(user_id=demo_user.id, intensity_before=7, intensity_after=2, trigger="Stress after work", notes="Chatted with AI Coach and went for a run.", intervention_completed=True, created_at=datetime.utcnow() - timedelta(days=4)),
            CravingLog(user_id=demo_user.id, intensity_before=6, intensity_after=2, trigger="Saw betting ad", notes="Closed app immediately and engaged distraction task.", intervention_completed=True, created_at=datetime.utcnow() - timedelta(days=6)),
            CravingLog(user_id=demo_user.id, intensity_before=9, intensity_after=4, trigger="Financial stress", notes="Reviewed financial simulator and saved ₹500 today.", intervention_completed=True, created_at=datetime.utcnow() - timedelta(days=9)),
        ]
        db.add_all(cravings)

        # 4. Mood Tracker History
        moods = [
            MoodLog(user_id=demo_user.id, mood_type="Great", urge_level=1, created_at=datetime.utcnow() - timedelta(days=1)),
            MoodLog(user_id=demo_user.id, mood_type="Good", urge_level=2, created_at=datetime.utcnow() - timedelta(days=2)),
            MoodLog(user_id=demo_user.id, mood_type="Okay", urge_level=3, created_at=datetime.utcnow() - timedelta(days=3)),
            MoodLog(user_id=demo_user.id, mood_type="Anxious", urge_level=6, created_at=datetime.utcnow() - timedelta(days=4)),
            MoodLog(user_id=demo_user.id, mood_type="Good", urge_level=2, created_at=datetime.utcnow() - timedelta(days=5)),
        ]
        db.add_all(moods)

        # 5. Financial Simulator Record
        finance = FinancialRecord(
            user_id=demo_user.id,
            daily_spend=500.0,
            monthly_spend=15000.0,
            yearly_spend=182500.0,
            goal_name="MacBook / High Performance Laptop & Skill Certifications",
            goal_cost=65000.0
        )
        db.add(finance)

        # 6. Trusted Circle Contacts
        contacts = [
            SupportContact(user_id=demo_user.id, name="Sunita Sharma (Mother)", relationship="Parent", phone="+91 98765 43210", email="sunita@example.com", notify_on_craving=True),
            SupportContact(user_id=demo_user.id, name="Aman Verma (Best Friend)", relationship="Friend", phone="+91 91234 56789", email="aman@example.com", notify_on_craving=False),
        ]
        db.add_all(contacts)

        # 7. Privacy Monitoring Logs
        activities = [
            ActivityLog(user_id=demo_user.id, activity_type="Betting App Usage", detail="Attempted opening Fantasy App - ReClaim Intervened", attempts_count=1, timestamp=datetime.utcnow() - timedelta(hours=18)),
            ActivityLog(user_id=demo_user.id, activity_type="Gambling Web Visit", detail="Visited betting news domain - Blocked notification shown", attempts_count=2, timestamp=datetime.utcnow() - timedelta(days=1)),
        ]
        db.add_all(activities)

        db.commit()
    return demo_user