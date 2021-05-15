from django.contrib.auth.models import User
from django.db import models

from ..movies.models import Movie


class Hall(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(unique=True)
    rows = models.IntegerField()
    columns = models.IntegerField()

    def __str__(self):
        return f'{self.name} ({self.rows * self.columns})'


class Screening(models.Model):
    id = models.IntegerField(primary_key=True)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f'({self.date}) - {self.movie.title} - hall: {self.hall.name}'


class Ticket(models.Model):
    id = models.IntegerField(primary_key=True)
    seat_number = models.IntegerField()
    screening = models.ForeignKey(Screening, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, default=None)

    def __str__(self):
        return f'[{self.screening}] - seat: {self.seat_number} - owner: {self.owner.username if self.owner else "--"}'
