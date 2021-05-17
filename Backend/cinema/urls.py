from django.urls import path

from cinema.movies import views as movies_views
from cinema.tickets import views as tickets_views
from cinema import fill_db

urlpatterns = [
    ############################# TO DELETE LATER ############################
    # Enpoint for filling db
    path('fill/', fill_db.GenerateDB.as_view(), name='generate'),
    ##########################################################################


    ############################# TO DELETE LATER ############################
    # Endpoint to check auth
    path('hello/', movies_views.HelloView.as_view(), name='hello'),
    ##########################################################################

    path('movies/', movies_views.AllMoviesView.as_view(), name='multiple_movies'),
    path('movies/<int:movie_id>', movies_views.SingleMovieView.as_view(), name='single_movie'),
    path('genres/', movies_views.GenresView.as_view(), name='all_genres'),
    path('genres/<str:genre_name>', movies_views.GenreMovieView.as_view(), name='movie_by_genre'),

    path('halls/', tickets_views.AllHallsView.as_view(), name='all_halls'),
    path('halls/<int:hall_id>', tickets_views.SingleHallView.as_view(), name='hall_by_id'),

    path('screenings/', tickets_views.AllScreeningsView.as_view(), name='all screenings'),
    path('screenings/<int:screening_id>', tickets_views.SingleScreeningView.as_view(), name='screening_by_id'),
    path('screenings/now/', tickets_views.ScreeningsNowView.as_view(), name='screenings_now'),
]
