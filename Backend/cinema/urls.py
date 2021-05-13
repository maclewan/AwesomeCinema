from django.urls import path, include

from cinema import views
from cinema import fill_db

urlpatterns = [
    ############################# TO DELETE LATER ############################
    # Enpoint for filling db
    path('fill/', fill_db.GenerateDB.as_view(), name='generate'),
    ##########################################################################


    ############################# TO DELETE LATER ############################
    # Endpoint to check auth
    path('hello/', views.HelloView.as_view(), name='hello'),
    ##########################################################################

    path('movies/', views.AllMoviesView.as_view(), name='multiple_movies'),
    path('movie/<int:movie_id>', views.SingleMovieView.as_view(), name='single_movie'),
    path('genres/', views.GenresView.as_view(), name='all_genres'),
    path('genres/<str:genre_name>', views.GenreMovieView.as_view(), name='movie_by_genre')

]
