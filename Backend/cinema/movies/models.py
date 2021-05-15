from django.db import models


class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    poster = models.TextField()
    backdrop = models.TextField()
    rating = models.FloatField()
    description = models.TextField()
    releaseDate = models.DateField()

    def __str__(self):
        return f'{self.title} ({self.releaseDate})'


class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()

    def __str__(self):
        return f'[{self.id}] {self.name}'


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.movie.title} - {self.genre.name}'
