from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from backend.chatbots.models import Chatbot

User = get_user_model()

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'company_name', 'activity', 'about', 'country', 'address', 'phone')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.pop('email', None)
        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )
        return user

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'company_name', 'activity', 'about', 'country', 'address', 'phone', 'profile_image')

    def get_profile_image(self, obj):
        if obj.profile_image:
            # Build full URL to the media file
            return settings.MEDIA_URL + str(obj.profile_image)
        return None
