from django.urls import path
# from .views import get_user_chatbots, get_chatbot_by_id, start_training
from .views import register, get_company_profile, update_profile, change_password
# from backend.chatbots.views import create_chatbot, get_user_chatbots

# routes are prefixed by /api/users
urlpatterns = [
    path('register/', register, name='register'),
    path('change-password/', change_password, name='change_password'),

    path('profile/', get_company_profile, name='get_company_profile'),
    path('profile/update/', update_profile, name='update_profile'),
]