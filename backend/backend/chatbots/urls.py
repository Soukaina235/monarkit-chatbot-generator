from django.urls import path
from .views import create_chatbot ,get_user_chatbots, get_chatbot_by_id, start_training, send_message, delete_chatbot, get_training_step
# from backend.chatbots.views import create_chatbot, get_user_chatbots

# routes are prefixed by /api/chatbots
urlpatterns = [
    path('create/', create_chatbot, name='create_chatbot'),
    path('', get_user_chatbots, name='get_user_chatbots'),
    path('<int:id>/', get_chatbot_by_id, name='get_chatbot_by_id'),
    path('start-training/<int:id>/', start_training, name='start_training'),
    path('send-message/', send_message, name='send_message'),
    path('delete/<int:chatbot_id>/', delete_chatbot, name='delete_chatbot'),
    path('training-step/<int:chatbot_id>/', get_training_step, name='get_training_step')
]
    