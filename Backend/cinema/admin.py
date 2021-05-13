from django.contrib import admin
from .models import Movie, Genre, MovieGenre
# Register your models here.

admin.site.register(Movie)
admin.site.register(MovieGenre)
admin.site.register(Genre)
