from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('language/select', views.select, name='language-select'),
    path('language/<language>', views.language, name='language-home'),
    path(r'language/<language>/<topic>', views.topic, name='language-topic'),
]
