from xmlrpc.client import ResponseError
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.core.mail import EmailMessage, send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
#from django.utils.encoding import force_bytes, force_text
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from constants import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


import json
import os
from dotenv import load_dotenv

# For making requests
from requests.auth import HTTPBasicAuth
import requests

# Settings to get the EMAIL information

# Generates Token for email confirmation


# Load .env file
load_dotenv()
ALPACA_KEY = os.getenv('ALPACA_KEY')
ALPACA_SECRET = os.getenv('ALPACA_SECRET')

URL = 'http://'+ALG_IP+':8000'

# Simply loads the React frontend.
def frontend(request):
    context = {}
    return render(request, "index.html", context)

@csrf_exempt
def signin(request):
    print("-----------HERE--------------------")
    auth = False
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    
    print("Authenticating User", user)
    if user is not None:
        auth = True
        login(request, user) # Does this return anything?
    ret = {
        "auth": auth,
        }    
    return JsonResponse(ret)
    #return redirect('console')

@csrf_exempt
def deploy(request):
    print('indeploy')
    print(type(request.POST))
    print(request.body.decode('UTF-8'))
    print(type(request.body.decode('UTF-8')))
    reqstr = request.body.decode('UTF-8')
    data = json.loads(reqstr)
    print(data)
    x = requests.post(URL, json = data)
    return JsonResponse(x.json())

@csrf_exempt
def getResults(request):
    x = requests.post(URL, json = {'op': 'getresults'})
    print(type(x))
    print(x.json())
    return JsonResponse(x.json())

@csrf_exempt
def getBranches(request):
    x = requests.post(URL, json = {'op': 'getbranches'})
    print(x.json())
    return JsonResponse(x.json())