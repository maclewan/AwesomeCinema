from django.urls import path, include

from cinema import views

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),


]
# fc93bb5d998239a48f5823dfa0154be2f6ac3287