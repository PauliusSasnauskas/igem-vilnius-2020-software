# !/usr/bin/env python
# -*- coding: utf-8 -*-
#IMPORTANT: Before running, install flask and waitress modules with commands
#                  `python -m pip install flask`
#                  `python -m pip install waitress`

import os
from flask import Flask, send_from_directory, request, jsonify, make_response
from waitress import serve

app = Flask(__name__, static_folder='public')

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def build_cors_preflight():
    print("building cors preflight")
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

# API urls
@app.route('/api/createJob', methods=['POST', 'OPTIONS'])
def createJob():
    if request.method == 'OPTIONS': return build_cors_preflight()

    data = request.json
    print("got request of:", data)
    # data object interface:
    # {
    #   isProbe : boolean,
    #   strainIds : Array<string>,
    #   taxIds : Array<number>,
    #   minLength : number?,
    #   maxLength : number?,
    #   excludeIntergenic : boolean,
    #   sequenceTypes : Array<string>?
    # }

    # testData = {
    #     'isProbe':	 	   True,
    #     'strainIds':		   ['ATCC 7195', 'IGEM 11-5-6'],
    #     'taxIds':			   [322, 111],
    #     'minLength':		   100,
    #     'maxLength':		   1000,
    #     'excludeIntergenic': True,
    #     'sequenceTypes':	   ['5S rRNA', '16S rRNA']
    # }
    # jobId = magicBackendFunction(testData)

    jobId = "f8e52URc74" # magicBackendFunction(data) # swap out for this function

    response = {
        "jobId": jobId
    }

    return _corsify_actual_response(jsonify(response))

@app.route('/api/checkJob', methods=['POST', 'OPTIONS'])
def checkJob():
    if request.method == 'OPTIONS': return build_cors_preflight()

    print("api checkJob")
    return 'Hello earth!'
'''
# Serve static React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def sserve(path):
    if path.startswith('/api/'):
        print("wrong!")
        return None
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
'''

if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True) # debug only
    # serve(app, host='0.0.0.0', port=8000) # production
