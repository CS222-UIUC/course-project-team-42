from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_ner_on/$', views.get_wiki_summary, name='get_ner_on'),
]