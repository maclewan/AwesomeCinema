"""
Helper script for downlaoding movies from api, and formating them to
"""

import requests
import json
from constants import API_KEY


def get_img_path(path):
    return f'https://image.tmdb.org/t/p/w440_and_h660_face{path}'


def get_backdrop_path(path):
    return f'https://image.tmdb.org/t/p/w370_and_h556_multi_faces{path}'


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

api_url = f'https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&sort_by=popularity.desc'

resp = requests.get(api_url)
content = json.loads(resp.content)['results']

movies = []
for c in content:
    genre = list(map(lambda i: genres[i], c['genre_ids']))
    c['genre'] = genre

    movies.append({
        'key': c['id'],
        'title': c['original_title'],
        'poster': get_img_path(c['poster_path']),
        'backdrop': get_backdrop_path(c['backdrop_path']),
        'rating': c['vote_average'],
        'description': c['overview'],
        'releaseDate': c['release_date'],
        'genre': list(map(lambda i: genres[i], c['genre_ids']))
    })

with open('movies.json', 'w', encoding='utf-16') as f:
    f.write(json.dumps(movies, indent=4))
