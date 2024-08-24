from rest_framework import serializers
from django.conf import settings
from backend.chatbots.models import Chatbot

class ChatbotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatbot
        fields = ['id', 'name', 'description', 'avatar', 'website_url', 'status', 'created_at']
        # read_only_fields = ['id', 'created_at']

    def get_avatar(self, obj):
        if obj.avatar:
            # Build full URL to the media file
            return settings.MEDIA_URL + str(obj.avatar)
        return None
    