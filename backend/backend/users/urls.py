from django.urls import path
from .views import register, get_company_profile, update_profile, change_password

# routes are prefixed by /api/users
urlpatterns = [
    path('register/', register, name='register'),
    path('profile/', get_company_profile, name='get_company_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('change-password/', change_password, name='change_password'),
]