from .models import Genre, MovieGenre, Movie
from .serializers import MovieSerializer
import json


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


def fill():
    with open('api/movies.json', 'rb') as f:
        movies = json.loads(f.read())

    print(movies)
    # Fill movies
    for m in movies:

        m['id'] = m['key']
        print(m)

        serializer = MovieSerializer(data=m)
        serializer.is_valid()
        movie = serializer.create(validated_data=serializer.data)
        movie.save()
    # Fill genres

    for g in genres:
        obj = Genre.objects.create(**{'id': g, 'name': genres[g]})
        print(obj)

    # Create relations
    for m in movies:
        key = m['key']
        genres = m['genre']

        movie = Movie.objects.get(id=key)
        for g in genres:
            genre = Genre.objects.get(name=g)

            movie_gen = MovieGenre.objects.create(movie=movie, genre=genre)
            print(movie_gen)
