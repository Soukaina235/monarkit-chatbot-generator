
from django.urls import path, include
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

# routes are prefixed by /api
urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', include('backend.users.urls')), # include the users app urls

    path("chatbots/", include('backend.chatbots.urls')), # include the chatbots app urls
]