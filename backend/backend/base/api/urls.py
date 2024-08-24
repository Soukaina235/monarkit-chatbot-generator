
from django.urls import path, include
from . import views
from .views import MyTokenObtainPairView
# , register, get_company_profile, update_profile, change_password, create_chatbot
# from backend.chatbots.views import create_chatbot

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# routes are prefixed by /api
urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # we are no longer using TokenObtainPairView, we are using our custom one
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', include('backend.users.urls')), # include the users app urls

    path("chatbots/", include('backend.chatbots.urls')), # include the chatbots app urls
]