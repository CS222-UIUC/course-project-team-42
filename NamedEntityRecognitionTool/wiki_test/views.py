from django.shortcuts import render

# Create your views here.

import json
from django.contrib.auth.models import User 
from django.http import JsonResponse , HttpResponse

import wikipedia
import spacy

# default function.
# this function will output a simple HttpResponse.
# can be used to test default success.
def index(request):
    return HttpResponse("Hello, world. <br> You're at the wiki index.")


# this function obtains a request when url called in format http://127.0.0.1:8000/wiki/get_ner_on/?topic="xxx"/
# request.GET.get('topic', None) will obtain "xxx".
# wikipedia.page(topic).content will get the main content (type str) of the specific wikipedia page.
# will return an HttpResponse containing necessary data, transformed from json
def getWikiSummary(request):
    topic = request.GET.get('topic', None)
    try:
        content = wikipedia.page(topic).content
    except(wikipedia.exceptions.PageError):
        data = {
            # 'summary': wikipedia.summary(topic,sentences=2),
            'content': "Error Message",
            'raw data': 'Unsuccessful',
            'entity': "Input is not a valid wiki page",
        }
        return HttpResponse(JsonResponse(data))
    print('topic:', topic)
    ner_str = jsonToNER(content)
    # 'content': wikipedia.page(topic).content,
    data = {
        # 'summary': wikipedia.summary(topic,sentences=2),
        'content': content,
        'raw data': 'Successful',
        'entity': ner_str,
    }
    print('json-data to be sent: ', data)
    return HttpResponse(JsonResponse(data))


# main NER algorithm, using spacy library, en_core_web_sm training data.
# input: str, wikipedia content
# can change input to necessary text in future development
# return type: str
# returns a concatenated str of named entities with their corresponding tags
def jsonToNER(s):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(s)
    output = ""
    for ent in doc.ents:
        label = ent.label_
        if (label == "PERSON") or (label == "ORG") or (label == "LOC") or (label == "DATE"):
            output += (ent.text + " - " + ent.label_ + "\n") 
        # print(ent.text, ent.label_)
    return output