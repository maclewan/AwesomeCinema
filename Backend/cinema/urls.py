from django.urls import path, include

from cinema import views

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),


]
