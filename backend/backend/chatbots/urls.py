from django.urls import path
from .views import create_chatbot
from backend.chatbots.views import create_chatbot

# routes are prefixed by /api
urlpatterns = [
    # path('create/', create_chatbot, name='create_chatbot'),
]
    