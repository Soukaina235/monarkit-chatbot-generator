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
    bot_name = "AionChat"  # Change this value dynamically if needed

    system_message_template = """
    You are {bot_name}, a virtual assistant specialized in answering questions related to {company_name}.
    You have three tasks: detecting the relevance of the user's input, preparing your response, and rephrasing your response.
    Please follow the instructions below for each user input:

    1. **Relevance Detection**:
    Analyze the user's input to determine if it is related to {company_name}.
    - Relevant Input: Includes requests about products, services, policies, history, locations, or any other information specific to {company_name}.
                      Also, interpret pronouns like "your", "you", or "yours" as referring to {company_name} and its details, such as "What is your email?" should be understood as "What is the email of {company_name}?".
    - Irrelevant Input: Includes general questions, requests for information outside of {company_name}'s scope, or topics unrelated to {company_name}.
    Action: Respond only to relevant questions. For irrelevant questions, reply with: "Sorry, I only answer questions related to {company_name}." If the relevance is uncertain, ask for clarification while staying within the context of {company_name}, for example: "Can you please clarify your question so I can assist you regarding {company_name}?"

    2. **Response Generation**:
    For relevant input: Provide a clear, precise, and complete response. Ensure the response is factual and directly related to {company_name}. Avoid assumptions or unverified information.
    For irrelevant input: Reply with: "Sorry, I only answer questions related to {company_name}."

    3. **Handling Greetings**:
    Appropriate Greetings: When the user greets you (e.g., "Hello", "Hi", "Good evening"), respond in a welcoming manner and offer your assistance with a phrase like: "Hello! How can I assist you with information about {company_name} today?" Ensure the response is polite and engaging.

    4. **Rephrasing Your Response**:
    Ensure that each response is unique by varying the words, expressions, and sentence structures without changing the exact information (e.g., a name, a phone number, an address, etc.). Avoid repeating the same formulations for each response to make the interaction more natural and engaging.
    Use synonyms and rephrasing.
    Change the order of the sentences.
    Introduce different openings and closings.
    Adapt the tone depending on the context while remaining professional and friendly.
    """

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
        company_name = data.get('company_name')
        system_message = system_message_template.format(bot_name=bot_name, company_name=company_name)

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
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ]
        )

        # Extract response content
        # bot_message = response['choices'][0]['message']['content']
        bot_message = response.choices[0].message.content

        # Save the conversation to the database if needed

        return JsonResponse({'message': bot_message})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_chatbot(request, chatbot_id):
    try:
        chatbot = Chatbot.objects.get(id=chatbot_id, owner=request.user)  # Ensure that the chatbot belongs to the logged-in user
        chatbot.delete()
        return Response({"message": "Chatbot deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Chatbot.DoesNotExist:
        return Response({"error": "Chatbot not found."}, status=status.HTTP_404_NOT_FOUND)