from django.shortcuts import render

# Create your views here.

import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####

import wikipedia
# from . import ner
import spacy

def index(request):
    return HttpResponse("Hello, world. <br> You're at the wiki index.")


# https://pypi.org/project/wikipedia/#description
def get_wiki_summary(request):
    topic = request.GET.get('topic', None)
    content = wikipedia.page(topic).content

    print('topic:', topic)

    ner_str = json_to_ner(content)
    # 'content': wikipedia.page(topic).content,
    data = {
        # 'summary': wikipedia.summary(topic,sentences=2),
        'content': content,
        '<br> <br> raw data': 'Successful',
        '<br> <br> entity': ner_str,
    }
    # data2 = {'raw': 'Successfulfff'}

    print('json-data to be sent: ', data)

    return HttpResponse(JsonResponse(data))

def json_to_ner(s):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(s)
    output = ""
    for ent in doc.ents:
        label = ent.label_
        if (label == "PERSON") or (label == "ORG") or (label == "LOC") or (label == "DATE"):
            output += (ent.text + " - " + ent.label_ + "<br>") 
        # print(ent.text, ent.label_)
    return output