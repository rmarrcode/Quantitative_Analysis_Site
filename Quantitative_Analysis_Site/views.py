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

import boto3
import botocore
import paramiko

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
    key = paramiko.RSAKey.from_private_key_file("Credentials/atticus_key.pem")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname='3.85.2.224', username="ubuntu", pkey=key)
        stdin, stdout, stderr = client.exec_command('docker run portfolio_learning')
        print (stdout.read())
        client.close()
    except Exception as e:
        print (e)
    return JsonResponse({})

@csrf_exempt
def getExperimentData(request):
    reqstr = request.body.decode('UTF-8')
    data = json.loads(reqstr)
    x = requests.post(URL, json = data)
    print(f"getExperimentData {x.json()}")
    return JsonResponse(x.json())

@csrf_exempt
def getBranches(request):
    x = requests.post(URL, json = {'op': 'getbranches'})
    return JsonResponse(x.json())