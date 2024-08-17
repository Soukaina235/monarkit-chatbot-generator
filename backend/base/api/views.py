from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CustomUserRegistrationSerializer
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # handles token creation (both access and refresh tokens)
from rest_framework_simplejwt.views import TokenObtainPairView # the default view for obtaining a pair of access and refresh tokens

# we are extending TokenObtainPairSerializer to add custom claims to the token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user) # generate the base token

        # add custom claims
        token['username'] = user.username

        return token
    
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
    ]
    # With JsonResponse : safe = False : we can render out anything more than just a python dictionary 
    # return JsonResponse({'routes': routes}, safe=False)
    # with Response, we don't need itn because it automatically handles rendering lists, dictionaries, and other data structures to JSON without needing the safe parameter
    return Response(routes)

@api_view(['POST'])
def register(request):
    serializer = CustomUserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)