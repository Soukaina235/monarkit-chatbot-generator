from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserRegistrationSerializer, CompanyProfileSerializer
from rest_framework import status, serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from django.contrib.auth import update_session_auth_hash
from rest_framework.exceptions import ValidationError

from backend.chatbots.serializers import ChatbotSerializer


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # handles token creation (both access and refresh tokens)
from rest_framework_simplejwt.views import TokenObtainPairView # the default view for obtaining a pair of access and refresh tokens

# we are extending TokenObtainPairSerializer to add custom claims to the token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user) # generate the base token

        # add custom claims
        token['email'] = user.email
        token['company_name'] = user.company_name  # Example of adding additional fields

        return token
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Authenticate user using email and password
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            return super().validate(attrs)
        else:
            raise serializers.ValidationError('Invalid credentials')
    
class MyTokenObtainPairView(TokenObtainPairView):
    # specifying that this view should use MyTokenObtainPairSerializer to serialize the data
    serializer_class = MyTokenObtainPairSerializer


# This is for API documentation
@api_view(['GET']) # decorator to convert a regular Django view into a REST API view that can handle different HTTP methods
def getRoutes(request):
    routes = [
        '/api/token', # submit username and password to get tokens (login)
        '/api/token/refresh',
        '/api/register',
        '/api/change-password',
        '/api/profile',
        '/api/profile/update',
        '/api/chatbot/create',
    ]
    # With JsonResponse : safe = False : we can render out anything more than just a python dictionary 
    # return JsonResponse({'routes': routes}, safe=False)
    # with Response, we don't need itn because it automatically handles rendering lists, dictionaries, and other data structures to JSON without needing the safe parameter
    return Response(routes)

@api_view(['POST'])
def register(request):
    serializer = CustomUserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        print("Validated data:", serializer.validated_data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_company_profile(request):
    user = request.user  # The currently authenticated user
    serializer = CompanyProfileSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        user = request.user
    except AttributeError:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
    serializer = CompanyProfileSerializer(user, data=request.data, partial=True)
    print("Request data:", request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    # validating like password too short, too similar to email...
    # try:
    #     validate_password(new_password, user)
    # except ValidationError as e:
    #     return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    # logout(request) 

    update_session_auth_hash(request, user)  # Update session with new password

    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)


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
