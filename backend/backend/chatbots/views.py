from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Chatbot
from .serializers import ChatbotSerializer
from django.http import JsonResponse
from .training_tasks import start_training_pipeline

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_chatbot(request):
#     serializer = ChatbotSerializer(data=request.data)
    
#     if serializer.is_valid():
#         serializer.save(owner=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


# @api_view(['POST'])
# def start_scraping(request):
#     url = request.data.get('url')
#     chatbot_id = request.data.get('chatbot_id')  # Assume the chatbot ID is sent in the request

#     # Fetch the chatbot instance
#     try:
#         chatbot = Chatbot.objects.get(id=chatbot_id)
#     except Chatbot.DoesNotExist:
#         return JsonResponse({'status': 'error', 'message': 'Chatbot not found'}, status=404)
    
#     # Update the training step
#     chatbot.training_step = 'scraping'
#     chatbot.save()

#     # Perform web scraping
#     content = extract_website_content(url)

#     # Optionally, update the chatbot with the scraped content
#     # chatbot.content = content
#     # chatbot.save()

#     return JsonResponse({'status': 'success', 'content': content, 'training_step': chatbot.training_step})