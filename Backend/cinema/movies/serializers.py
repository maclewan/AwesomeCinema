from rest_framework import serializers

from cinema.movies.models import Movie, Genre


class MovieSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    poster = serializers.CharField()
    backdrop = serializers.CharField()
    rating = serializers.FloatField()
    description = serializers.CharField()
    releaseDate = serializers.DateField(format='%Y/%m/%d %H:%M')

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        movie = Movie.objects.create(**validated_data)
        return movie


class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        genre = Genre.objects.create(**validated_data)
        return genre

