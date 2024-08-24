from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Chatbot
from .serializers import ChatbotSerializer
from django.http import JsonResponse
from .training_tasks import start_training_pipeline

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chatbot(request):
    serializer = ChatbotSerializer(data=request.data)

    print("Request data:", request.data)
    print("Serializer data:", serializer)
    
    if serializer.is_valid():
        # Access the authenticated user
        user = request.user
        print("Authenticated user:", user)
        
        # Save the serializer data and set the owner to the authenticated user
        serializer.save(owner=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_chatbots(request):
    try:
        user = request.user
    except Exception:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    chatbots = Chatbot.objects.filter(owner=user)
    serializer = ChatbotSerializer(chatbots, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chatbot_by_id(request, id):
    try:
        chatbot = Chatbot.objects.get(id=id, owner=request.user)
    except Chatbot.DoesNotExist:
        return Response({'error': 'Chatbot not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ChatbotSerializer(chatbot)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def start_training(request, id):
    user_id = request.user.id
    start_training_pipeline.delay(id, user_id)
    return JsonResponse({'status': 'Training started'})