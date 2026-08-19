from fastapi import APIRouter
from app.schemas import FinancialCalcRequest, FinancialCalcResponse

router = APIRouter(prefix="/api/finance", tags=["Financial Simulator"])

@router.post("/calculate", response_model=FinancialCalcResponse)
def calculate_financials(req: FinancialCalcRequest):
    daily = max(req.daily_spend, 10.0)
    monthly = daily * 30.0
    yearly = daily * 365.0
    five_year = yearly * 5.0

    cost = req.goal_cost if req.goal_cost and req.goal_cost > 0 else 60000.0
    months_needed = round(cost / monthly, 1)

    alternative_items = [
        {"name": "Skill Development Course (AI / Dev / Design)", "cost": 3500.0, "quantity": int(yearly // 3500)},
        {"name": "High-Performance Laptop for Career", "cost": 65000.0, "quantity": int(yearly // 65000)},
        {"name": "Emergency Financial Cushion Fund", "cost": 50000.0, "quantity": int(yearly // 50000)},
        {"name": "Higher Education & Certifications", "cost": 25000.0, "quantity": int(yearly // 25000)},
        {"name": "Dream Vacation / Travel Fund", "cost": 40000.0, "quantity": int(yearly // 40000)},
    ]

    return FinancialCalcResponse(
        daily_spend=daily,
        monthly_spend=monthly,
        yearly_spend=yearly,
        five_year_spend=five_year,
        goal_name=req.goal_name or "Tech Laptop & Skill Courses",
        months_to_achieve_goal=months_needed,
        alternative_items=alternative_items
    )