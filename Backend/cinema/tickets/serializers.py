from django.contrib.auth.models import User
from rest_framework import serializers

from cinema.tickets.models import Hall, Screening, Ticket


class HallSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    rows = serializers.IntegerField()
    columns = serializers.IntegerField()


class ScreeningSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hall = serializers.CharField(source='hall.name')
    movie_id = serializers.IntegerField(source='movie.id')
    movie_name = serializers.CharField(source='movie')
    date = serializers.DateTimeField()

    class Meta:
        model = Screening
        fields = ('id', 'hall', 'movie', 'date')


class TicketSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    seat_number = serializers.IntegerField()
    hall = serializers.CharField(source='screening.hall.name')
    movie_id = serializers.IntegerField(source='screening.movie.id')
    movie_name = serializers.CharField(source='screening.movie')
    date = serializers.CharField(source='screening.date')
    owner = serializers.CharField()

    class Meta:
        model = Screening
        fields = ('id', 'seat_number', 'screening', 'owner')

    def update_owner(self, instance: Ticket, new_owner: User):
        instance.owner = new_owner
        instance.save()
        return instance
