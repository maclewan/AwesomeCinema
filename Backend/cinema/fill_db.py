import random
from datetime import datetime, timedelta, time
from functools import reduce

import pytz
from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.movies.models import Genre, MovieGenre, Movie
from cinema.movies.serializers import MovieSerializer
import json

from cinema.tickets.models import Hall, Screening, Ticket

HALLS = 6  # (max 50)
DAYS = 10
START_HOUR = 13
END_HOUR = 23


def fill_movies():
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


def fill_halls():
    states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut",
              "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho",
              "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine",
              "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota",
              "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma",
              "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
              "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia",
              "Wyoming"]
    try:
        for i in range(HALLS):
            rname = states.pop(random.randint(0, len(states) - 1))
            rrows = random.randint(6, 11)
            rcol = random.randint(int(rrows * 1.2), int(rrows * 2))

            h = Hall(id=i + 1, name=f'{i + 1} {rname}', rows=rrows, columns=rcol)
            h.save()
        return True
    except:
        return False


def fill_screenings():
    movies = Movie.objects.all()
    halls = Hall.objects.all()
    try:
        day = datetime.now()
        day = datetime(year=day.year, month=day.month, day=day.day, hour=START_HOUR, minute=0, second=0, )
        timezone = pytz.timezone("Europe/Warsaw")
        day = timezone.localize(day)

        for h in halls:
            for d in range(1, DAYS + 1):
                new_day = day + timedelta(days=d) + timedelta(minutes=random.randint(0, 8) * 15)
                while True:
                    m = random.choice(movies)
                    # Create screening
                    s = Screening(hall=h, movie=m, date=new_day)
                    # print(s)
                    s.save()
                    new_day = new_day + timedelta(hours=3) + timedelta(minutes=random.randint(1, 3) * 15)
                    if new_day.hour >= END_HOUR or new_day.hour < START_HOUR:
                        break
        return True
    except Exception as e:
        print(e)
        return False


def fill_tickets():
    screenings = Screening.objects.all()

    try:
        for s in screenings:
            for i in range(s.hall.rows * s.hall.columns):
                t = Ticket(seat_number=i + 1, screening=s, owner=None)
                # print(t)
                t.save()

        return True
    except Exception as e:
        print(e)
        return False


class GenerateDB(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        results = []
        results.append(fill_movies())
        results.append(fill_halls())
        results.append(fill_screenings())
        results.append(fill_tickets())
        res = reduce(lambda a, b: a and b, results)

        content = {'message': 'Filled db'} if res else {'message': 'Error while filling db'}
        return Response(content)
