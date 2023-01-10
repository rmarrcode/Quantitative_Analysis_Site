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
import paramiko
import pickle

from ExpState.models import ExpState

import channels.layers
from asgiref.sync import async_to_sync

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
    reqstr = request.body.decode('UTF-8')
    data = json.loads(reqstr)
    CMD = 'docker run portfolio_learning --tickers ' + data['tickers']
    print(CMD)
    try:
        client.connect(hostname=ALG_IP, username="ubuntu", pkey=key)
        stdin, stdout, stderr = client.exec_command(CMD)
        print(stderr.read())
        print(stdout.read())
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

@csrf_exempt
def updateResults(request):
    ## load experiment data
    reqstr = request.body.decode('utf-8')
    reqjson = json.loads(reqstr)
    exp_id = reqjson['exp_id']
    channel_layer = channels.layers.get_channel_layer()
    if reqjson['bootstrapping']:   
        async_to_sync(channel_layer.group_send)(
                'test',
            {
                'type': 'chat_message',
                'data': {
                    'exp_id': exp_id,
                    'returns': {}
                }
            }
        )
        return JsonResponse({'success': True})
    #bypass this by getting most recent info
    s3_client = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    # TODO TRY EXCEPT
    s3_object = s3_client.get_object(Bucket='portfolio-learning', Key=exp_id)
    s3_exp_data = pickle.loads(s3_object['Body'].read())
    ## update db
    ## updated_exp_data = {reqstr : tuple(s3_exp_data['our_log_ret'])}
    ## print(f'-------{updated_exp_data}')
    ## ExpState.update(updated_exp_data)
    ##notify frontend
    print(f"s3_exp_data {s3_exp_data}")
    async_to_sync(channel_layer.group_send)(
                'test',
            {
                'type': 'chat_message',
                'data': {
                    'exp_id': exp_id,
                    'returns': s3_exp_data
                }
            }
        )
    return JsonResponse({'success': True})

@csrf_exempt
def getResults(request):
    exp_state = ExpState.load()
    print(exp_state.exp_id)
    return JsonResponse({'success': True})

