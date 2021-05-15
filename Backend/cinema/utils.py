from cinema.movies.models import MovieGenre
from cinema.movies.serializers import MovieSerializer


def serialize_movies_with_genres(movies):
    serialized = MovieSerializer(movies, many=True).data

    for index, m in enumerate(movies):
        serialized[index]['genres'] = list(map(lambda r: r.genre.name, MovieGenre.objects.filter(movie=m)))

    if len(movies) > 1:
        return serialized
    elif len(movies) == 1:
        return serialized[0]
    return {}