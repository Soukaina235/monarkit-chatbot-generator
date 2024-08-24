from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # handles token creation (both access and refresh tokens)
from rest_framework_simplejwt.views import TokenObtainPairView # the default view for obtaining a pair of access and refresh tokens

# we are extending TokenObtainPairSerializer to add custom claims to the token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user) # generate the base token

        # add custom claims
        token['email'] = user.email
        token['company_name'] = user.company_name 

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
        '/api/token', # submit email and password to get tokens (login)
        '/api/token/refresh',
        '/api/register',
        '/api/change-password',
        '/api/profile',
        '/api/profile/update',
        '/api/chatbots/create',
        # more 
    ]
    # With JsonResponse : safe = False : we can render out anything more than just a python dictionary 
    # return JsonResponse({'routes': routes}, safe=False)
    # with Response, we don't need it because it automatically handles rendering lists, dictionaries, and other data structures to JSON without needing the safe parameter
    return Response(routes)
