from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Chatbot
from .serializers import ChatbotSerializer

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_chatbot(request):
#     serializer = ChatbotSerializer(data=request.data)
    
#     if serializer.is_valid():
#         serializer.save(owner=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
