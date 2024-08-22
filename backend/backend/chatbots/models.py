from django.db import models
from django.conf import settings
from django.utils import timezone
import os



def chatbot_avatar_directory_path(instance, filename):
    # File will be uploaded to MEDIA_ROOT/chatbot_avatars/<user-id>/<timedate>.<extension>
    user_id = instance.owner.id if instance.owner else 'unknown_user'
    extension = filename.split('.')[-1]    
    newFilename = f"{timezone.now().strftime('%Y%m%d%H%M%S')}.{extension}"
    return os.path.join(f'chatbot_avatars/{user_id}', filename)

class Chatbot(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chatbots')
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to=chatbot_avatar_directory_path, blank=True, null=True)
    website_url = models.URLField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_avatar_url(self):
        if self.avatar:
            return settings.MEDIA_URL + str(self.avatar)
        return None
    
