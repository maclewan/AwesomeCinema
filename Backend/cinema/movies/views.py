# Create your views here.
from rest_framework import status

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.movies.models import Movie, Genre, MovieGenre
from cinema.movies.serializers import GenreSerializer

from cinema.utils import serialize_movies_with_genres


class HelloView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class AllMoviesView(APIView):
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
        return Response(payload, status=status.HTTP_200_OK)


class SingleMovieView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, movie_id):
        """
        Returns movie by id if exists
        """
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized = serialize_movies_with_genres([movie])

        payload = {
            'movie': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class GenresView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Returns all genres
        """

        genres = Genre.objects.all()
        serialized = GenreSerializer(genres, many=True).data

        payload = {
            'genres': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class GenreMovieView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, genre_name):
        """
        Returns movie by genre
        """

        relations = MovieGenre.objects.filter(genre__name__icontains=genre_name)
        movies = [r.movie for r in relations]
        serialized = serialize_movies_with_genres(movies)

        payload = {
            'search_key': genre_name,
            'movies': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)

class IsAdminView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Checks if logged user is staff or customer
        """

        is_staff = request.user.is_staff

        payload = {
            'is_staff': is_staff
        }
        return Response(payload, status=status.HTTP_200_OK)