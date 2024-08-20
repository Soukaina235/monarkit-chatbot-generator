from django.urls import path
from . import views
from .views import MyTokenObtainPairView, register, get_company_profile, update_profile, change_password

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# routes are prefixed by /api
urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # we are no longer using TokenObtainPairView, we are using our custom one
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('change-password/', change_password, name='change_password'),

    path('profile/', get_company_profile, name='get_company_profile'),
    path('profile/update/', update_profile, name='update_profile'),
]