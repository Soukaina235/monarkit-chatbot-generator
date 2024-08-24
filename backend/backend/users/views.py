from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from backend.users.serializers import CustomUserRegistrationSerializer, CompanyProfileSerializer
from rest_framework import status, serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from django.contrib.auth import update_session_auth_hash
from rest_framework.exceptions import ValidationError


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