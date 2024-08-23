from django.urls import path
from .views import get_user_chatbots, get_chatbot_by_id, start_training
# from backend.chatbots.views import create_chatbot, get_user_chatbots

# routes are prefixed by /api/chatbots
urlpatterns = [
    # path('create/', create_chatbot, name='create_chatbot'),
    path('', get_user_chatbots, name='get_user_chatbots'),
    path('<int:id>/', get_chatbot_by_id, name='get_chatbot_by_id'),
    path('start-training/<int:id>/', start_training, name='start_training'),
]
    