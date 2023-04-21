from django.shortcuts import render
import json
from django.contrib.auth.models import User 
from django.http import JsonResponse , HttpResponse
import wikipedia
import spacy
from wiki_test import db_manager
from django.views.decorators.csrf import csrf_exempt


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
            'content': "Error Message",
            'raw data': 'Unsuccessful',
            'entity': "Input is not a valid wiki page",
        }
        return HttpResponse(JsonResponse(data))
    print('topic:', topic)
    ner_str = jsonToNER(content)
    data = {
        'content': content,
        'raw data': 'Successful',
        'entity': ner_str,
    }
    print('json-data to be sent: ', data)
    return HttpResponse(JsonResponse(data))


# this function obtains a request when url called in format http://127.0.0.1:8000/wiki/get_ner_freq/?topic="xxx"/
# request.GET.get('topic', None) will obtain "xxx".
# wikipedia.page(topic).content will get the main content (type str) of the specific wikipedia page.
# will return a JsonResponse containing necessary data
# main goal for this function is to get the top 10 frequencies from NER algorithm.
def getWikiFreq(request):
    topic = request.GET.get('topic', None)
    try:
        content = wikipedia.page(topic).content
    except(wikipedia.exceptions.PageError):
        data = {
            'content': "Error Message",
            'raw data': 'Unsuccessful',
            'entity': "Input is not a valid wiki page",
            'freq': "no frequency due to error",
        }
        return HttpResponse(JsonResponse(data))
    print('topic:', topic)
    ner_entity, ner_freq, ner_ent_10, ner_freq_10 = jsonToNERFreq(content)
    data = {
        'content': content,
        'raw data': 'Successful',
        'entity': ner_entity,
        'freq': ner_freq,
        'ent10': ner_ent_10,
        'freq10': ner_freq_10,
    }
    print('json-data to be sent: ', data)
    return JsonResponse(data)

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
    return output


# main NER algorithm, using spacy library, en_core_web_sm training data.
# input: str, wikipedia content
# can change input to necessary text in future development
# return type: entities json, freq json, ent10 json, freq10 json
# returns 4 json objects, storing necessay names and frequencies
def jsonToNERFreq(s):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(s)
    output = {}
    for ent in doc.ents:
        label = ent.label_
        if (label == "PERSON") or (label == "ORG") or (label == "LOC") or (label == "DATE"):
            if ent.text not in output.keys():
                output[ent.text] = 1
            else:
                output[ent.text] += 1

    output = dict(sorted(output.items(), key = lambda x: x[1], reverse=True))
    entities = []
    freq = []
    for i in output:
        entities.append(i)
        freq.append(output[i])
    ent10 = entities[:10]
    freq10 = freq[:10]
    entities = json.dumps(entities)
    freq = json.dumps(freq)
    ent10 = json.dumps(ent10)
    freq10 = json.dumps(freq10)

    return entities, freq, ent10, freq10


# TEST FUNCTION FOR LOGIN
# simple connection function for login
# requires the front end to use axios.put, and pass a json object
# json.loads will catch the json object, and read from it
# the json object should contain username and password
@csrf_exempt
def login(request):
    if request.method == 'PUT':
        payload = json.loads(request.body.decode('utf-8'))
        username = payload['username']
        password = payload['password']
        output = db_manager.userLoginCheck(username, password)
        if output == None:
            return HttpResponse("Invalid username or password")
        return HttpResponse("Successfully login!")
    elif request.method == 'GET':
        return HttpResponse("testing: get success login")
        
    return HttpResponse("not a get or put")


# TEST FUNCTION FOR CREATING NEW USER
# simple connection function for creating new user
# requires the front end to use axios.put, and pass a json object
# json.loads will catch the json object, and read from it
# the json object should contain username and password
@csrf_exempt
def create(request):
    if request.method == 'PUT':
        # return HttpResponse("username already exists, no need to create")
        payload = json.loads(request.body.decode('utf-8'))
        username = payload['username']
        password = payload['password']
        # return HttpResponse(password)
        output = db_manager.userLoginCheck(username, password)
        if output != None:
            return HttpResponse("Username already exists.")
        else:
           output = db_manager.userInformationAdd(username, password)
        return HttpResponse("Successfully created username and password! Please login now.")
    elif request.method == 'GET':
        return HttpResponse("testing: get success create")
        
    return HttpResponse("not a get or put")


# TEST FUNCTION FOR RESETTING PASSWORD
# simple connection function for password reset
# requires the front end to use axios.put, and pass a json object
# json.loads will catch the json object, and read from it
# the json object should contain username and password
@csrf_exempt
def reset(request):
    if request.method == 'PUT':
        payload = json.loads(request.body.decode('utf-8'))
        username = payload['username']
        password = payload['password']
        newPassword = payload['newPassword']
        output = db_manager.userLoginCheck(username, password)
        if output != None:
            db_manager.userInformationDelete(username, password)
            db_manager.userInformationAdd(username, newPassword)
            return HttpResponse("Successfully reset password! Please login now.")
        else:
           return HttpResponse("Wrong username or password, please try again.")
    elif request.method == 'GET':
        return HttpResponse("testing: get success reset")
        
    return HttpResponse("not a get or put")


# function recieves a file from client
# requires the front end to use axios.put, and pass a file (txt)
@csrf_exempt
def upload(request):
    if request.method == 'PUT':
        file = request.FILES.get('file')
        content = file.read()
        ner_str = jsonToNER(content)
        data = {
            'content': content,
            'raw data': 'Successful',
            'entity': ner_str,
        }
        print('json-data to be sent: ', data)
        return HttpResponse(JsonResponse(data))
    elif request.method == 'GET':
        return HttpResponse("testing: get success upload")
        
    return HttpResponse("not a get or put")