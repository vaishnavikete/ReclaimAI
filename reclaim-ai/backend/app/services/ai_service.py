class AIService:

    @staticmethod
    def generate_recovery_response(
        prompt: str,
        user_context: dict,
        quick_action: str | None = None
    ):
        return {
            "response": (
                "I'm your ReClaim AI Recovery Companion. "
                "AI integration is currently being configured. "
                "For now, I can receive and store your messages."
            ),
            "action_suggestion": None
        }