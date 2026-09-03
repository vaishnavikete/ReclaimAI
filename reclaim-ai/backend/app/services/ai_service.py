```python
from google import genai
from app.config import settings


DEMO_RESPONSES = {
    "craving": (
        "I hear you, and it takes courage to admit you're having an urge right now. "
        "Urges can feel intense, but they pass. Let's pause together and focus on "
        "getting through the next few minutes."
    ),

    "stressed": (
        "I'm sorry you're feeling stressed. Stress can make gambling urges stronger. "
        "Let's slow things down and identify what's causing the pressure right now."
    ),

    "lost_money": (
        "Trying to win back money by gambling more can create a painful cycle. "
        "What's already lost is in the past. Right now, let's focus on protecting "
        "your money and your future."
    ),

    "want_to_gamble": (
        "Thank you for reaching out before acting on the urge. That's an important "
        "step. Let's focus on getting through this moment without gambling."
    ),

    "calm_down": (
        "Let's slow things down together. Inhale for 4 seconds, hold for 4 seconds, "
        "and exhale slowly for 6 seconds. Repeat this three times."
    ),

    "task": (
        "Here is your recovery action for today: write down three things you're "
        "grateful for or contact someone you trust for a short conversation."
    )
}


class AIService:

    @staticmethod
    def generate_recovery_response(
        prompt: str,
        user_context: dict = None,
        quick_action: str = None
    ) -> dict:

        prompt = prompt or ""
        prompt_lower = prompt.lower()

        # Quick action responses
        if quick_action and quick_action in DEMO_RESPONSES:
            return {
                "response": DEMO_RESPONSES[quick_action],
                "action_suggestion": (
                    "10_min_intervention"
                    if quick_action in ["craving", "want_to_gamble"]
                    else "task"
                )
            }

        # Gemini AI response
        if settings.GEMINI_API_KEY:

            try:
                client = genai.Client(
                    api_key=settings.GEMINI_API_KEY
                )

                system_prompt = """
You are ReClaim AI Coach, an empathetic and supportive
gambling-recovery companion.

Your job is to help users reduce and stop gambling.

Rules:
- Never encourage gambling.
- Never encourage chasing losses.
- Never give gambling strategies or betting advice.
- Be empathetic and non-judgmental.
- Give practical steps the user can take immediately.
- Encourage healthy alternatives to gambling.
- If the user is in serious distress or danger, encourage
  them to contact a trusted person or appropriate professional help.
- Keep responses clear and reasonably short.
- Do not repeatedly give the same response.
"""

                full_prompt = f"""
{system_prompt}

User message:
{prompt}

User context:
{user_context or {}}

Respond specifically to what the user said.
"""

                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=full_prompt
                )

                if response and response.text:
                    return {
                        "response": response.text,
                        "action_suggestion": "support"
                    }

            except Exception as e:
                print("GEMINI ERROR:", repr(e))

        # Fallback responses
        if any(
            word in prompt_lower
            for word in ["lost", "loss", "lost money", "win back"]
        ):
            return {
                "response": DEMO_RESPONSES["lost_money"],
                "action_suggestion": "finance"
            }

        elif any(
            word in prompt_lower
            for word in ["urge", "craving", "gamble"]
        ):
            return {
                "response": DEMO_RESPONSES["craving"],
                "action_suggestion": "10_min_intervention"
            }

        else:
            streak = (
                user_context.get("streak", 12)
                if user_context
                else 12
            )

            return {
                "response": (
                    f"You are on a strong {streak}-day gambling-free streak! "
                    "Every moment you choose recovery, you regain control. "
                    "How can I help you right now?"
                ),
                "action_suggestion": "daily_task"
            }
```
