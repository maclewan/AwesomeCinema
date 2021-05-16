from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.tickets.models import Hall, Screening, Ticket
from cinema.tickets.serializers import HallSerializer, ScreeningSerializer, TicketSerializer

'''
class TestView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        halls = Ticket.objects.all()
        serial = TicketSerializer(halls, many=True).data
        content = serial
        return Response(content)
'''

'''class AllMoviesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Returns (filtered) movies
        """
        movie_name = request.query_params.get(key='name', default=None)
        movies = Movie.objects.filter(title__icontains=movie_name) if movie_name else Movie.objects.all()
        serialized = serialize_movies_with_genres(movies)

        payload = {
            'movies': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)'''