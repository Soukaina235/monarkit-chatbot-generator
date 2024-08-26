from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Chatbot
from .serializers import ChatbotSerializer
from django.http import JsonResponse
from .training_tasks import start_training_pipeline
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json
from dotenv import load_dotenv
import os

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



@csrf_exempt
@permission_classes([IsAuthenticated])
def send_message(request):
    openai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=openai_api_key)

    if request.method == 'POST':
        data = json.loads(request.body)

        # # Extract data from request
        # chatbot_id = data.get('chatbot_id')
        # user_id = data.get('user_id')

        # user_id = request.user.id

        user_message = data.get('user_input')
        chatbot_id = int(data.get('chatbot_id'))

        print("User message:", user_message)
        print("Chatbot ID:", chatbot_id)
        print("data:", data)

        try:
            chatbot = Chatbot.objects.get(id=chatbot_id) # , owner=request.user
        except Chatbot.DoesNotExist:
            return Response({'error': 'Chatbot not found'}, status=status.HTTP_404_NOT_FOUND)

        # Generate a response using the OpenAI API
        response = client.chat.completions.create(
            model=chatbot.openai_model_id,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ]
        )

        # Extract response content
        # bot_message = response['choices'][0]['message']['content']
        bot_message = response.choices[0].message.content

        # Save the conversation to the database if needed

        return JsonResponse({'message': bot_message})
