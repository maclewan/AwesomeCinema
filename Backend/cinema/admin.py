from django.contrib import admin
from cinema.movies.models import Movie, Genre, MovieGenre
from cinema.tickets.models import Hall, Screening, Ticket


admin.site.register(Movie)
admin.site.register(MovieGenre)
admin.site.register(Genre)

admin.site.register(Hall)
admin.site.register(Screening)
admin.site.register(Ticket)
