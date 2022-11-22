from http.server import BaseHTTPRequestHandler, HTTPServer
import time
from io import BytesIO
import json
import os
from getdata import getdata
from git import Repo
import time

hostName = '0.0.0.0'
serverPort = 8000

class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode('UTF-8')
        req = json.loads(body)
        print(json.loads(body))
        if req['op'] == 'getresults':
            getdata()
            lst = os.listdir('experiments')
            self.send_response(200)
            self.send_header("Content-type", "json")
            self.end_headers()
            self.wfile.write(json.dumps({'data':lst}).encode('utf-8'))
        elif req['op'] == 'deploy':
            print('IN DEPLOY')
            print(req)
            os.system('docker run portfolio_learning ' + '--tickers ' + req['tickers'])
            #self.wfile.write(response.getvalue())
            #self.wfile.write(json.dumps({'data': 'data'}).encode('utf-8'))
            #deploy the actual experiment 
            #this kinda sucks
            time.sleep(2)
            lst = os.listdir('experiments')
            print('in deploy {lst}')
            self.send_response(200)
            self.send_header("Content-type", "json")
            self.end_headers()
            self.wfile.write(json.dumps({'data':lst}).encode('utf-8'))
        elif req['op'] == 'getbranches':
            r = Repo('/home/ubuntu/portfolio_learning')
            self.send_response(200)
            self.send_header("Content-type", "json")
            self.end_headers()
            self.wfile.write(json.dumps({'ec2 data':[x.name for x in r.heads]}).encode('utf-8'))
        elif req['op'] == 'getexpirementdata':
            pass


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")