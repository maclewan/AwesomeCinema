from django.urls import path, include

from cinema import views
from cinema import fill_db

urlpatterns = [
    ############################# TO DELETE LATER ############################
    # Enpoint for filling db
    path('fill/', fill_db.GenerateDB.as_view(), name='generate'),
    ##########################################################################



    path('hello/', views.HelloView.as_view(), name='hello'),


]
