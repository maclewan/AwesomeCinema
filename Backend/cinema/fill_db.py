from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.movies.models import Genre, MovieGenre, Movie
from cinema.movies.serializers import MovieSerializer
import json


def fill():
    genres = {
        12: 'Adventure',
        14: 'Fantasy',
        16: 'Animation',
        18: 'Drama',
        27: 'Horror',
        28: 'Action',
        35: 'Comedy',
        36: 'History',
        37: 'Western',
        53: 'Thriller',
        80: 'Crime',
        99: 'Documentary',
        878: 'Science Fiction',
        9648: 'Mystery',
        10402: 'Music',
        10749: 'Romance',
        10751: 'Family',
        10752: 'War',
        10770: 'TV Movie',
    }

    with open('api/movies.json', 'rb') as f:
        movies = json.loads(f.read())

    # Fill movies

    try:
        for m in movies:

            m['id'] = m['key']

            serializer = MovieSerializer(data=m)
            serializer.is_valid()
            movie = serializer.create(validated_data=serializer.data)
            movie.save()
        # Fill genres

        for g in genres:
            obj = Genre.objects.create(**{'id': g, 'name': genres[g]})

        # Create relations
        for m in movies:
            key = m['key']
            genres = m['genre']

            movie = Movie.objects.get(id=key)
            for g in genres:
                genre = Genre.objects.get(name=g)

                movie_gen = MovieGenre.objects.create(movie=movie, genre=genre)
        return True
    except:
        return False


class GenerateDB(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        res = fill()
        content = {'message': 'Filled db'} if res else {'message': 'Error while filling db'}
        return Response(content)