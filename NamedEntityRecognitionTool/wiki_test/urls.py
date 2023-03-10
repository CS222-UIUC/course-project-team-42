from django.urls import path, re_path

from . import views

# follow from django_ner_tool.urls
# e.g. http://127.0.0.1:8000/wiki/get_ner_on/?topic="meme"/
# http://127.0.0.1:8000/wiki/ from django_ner_tool.urls
# /get_ner_on/ will trigger urlpatterns below
# /?topic="meme"/ will tell views to look at the "meme" topic

# if simply http://127.0.0.1:8000/wiki/ then will trigger views.index() function
# if http://127.0.0.1:8000/wiki/get_ner_on/?topic="xxx"/ then will trigger views.getWikiSummary function
urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_ner_on/$', views.getWikiSummary, name='get_ner_on'),
]