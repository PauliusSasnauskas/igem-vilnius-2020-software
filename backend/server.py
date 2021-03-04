#IMPORTANT: Before running, install flask and waitress modules with commands
#                  `python -m pip install flask`
#                  `python -m pip install waitress`

import os
import requests
import json
from flask import Flask, send_from_directory, request, jsonify, make_response
from waitress import serve
import lfa_test_line_location_function
import lfa_time_volume_function_full_simulation
from operator import itemgetter

app = Flask(__name__, static_folder='public')

def _corsify_actual_response(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def build_cors_preflight():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

def microToNormal(val):
    return val/1000000

def milliToNormal(val):
    return val/1000

def s4cmToMPS(val):
    return 4/val/100

# API urls
@app.route('/api/calculate', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS': return build_cors_preflight()

    data = request.json
    print('got request of:', data) 

    signalThreshold, flowRate, length, width, thickness, aCoef, pCoef, rCoef, initVelocity, velocityDecay, diffusCoef, probeDiffusCoef, complexDiffusCoef, assocRate1, dissocRate1, assocRate2, dissocRate2, assocRate3, dissocRate3, assocRate4, dissocRate4 = itemgetter(
        "signalThreshold",  # 0 to 1
        "flowRate",         # 180 s/4cm
        "length",           # 25 mm
        "width",            # 6 mm
        "thickness",        # 0.135 mm
        "aCoef",            # 0.01 μM
        "pCoef",            # 0.01 μM
        "rCoef",            # 0.01 μM
        "initVelocity",     # 218.6 s/4cm
        "velocityDecay",    # 0.00855 1/s
        "diffusCoef",       # 1e-11 m²/s
        "probeDiffusCoef",  # 1e-11 m²/s
        "complexDiffusCoef",# 1e-11 m²/s
        "assocRate1",       # 1000000 1/s
        "dissocRate1",      # 0.001 1/s
        "assocRate2",       # 1000000 1/s
        "dissocRate2",      # 0.001 1/s
        "assocRate3",       # 1000000 1/s
        "dissocRate3",      # 0.001 1/s
        "assocRate4",       # 1000000 1/s
        "dissocRate4",      # 0.001 1/s
    )(data)

    optimal_dist_np = lfa_test_line_location_function.lfa_test_line_location(
        A0 = microToNormal(aCoef),
        P0 = microToNormal(pCoef),
        D_A = diffusCoef,
        D_P = probeDiffusCoef,
        D_PA = complexDiffusCoef,
        ka1 = assocRate1,
        kd1 = dissocRate1,
        U = s4cmToMPS(flowRate),
        L = milliToNormal(length),
        C = s4cmToMPS(initVelocity),
        r = velocityDecay,
        width = milliToNormal(width),
        PA_coef = signalThreshold
    )
    optimal_dist = optimal_dist_np.astype(float)
    print("Found optimal distance: ", optimal_dist)
    optimal_index, optimal_rpa, rpa_concentration, time_point, volume = lfa_time_volume_function_full_simulation.lfa_time_volume(
        xL1 = optimal_dist,
        A0 = microToNormal(aCoef),
        P0 = microToNormal(pCoef),
        R0 = microToNormal(rCoef),
        D_A = diffusCoef,
        D_P = probeDiffusCoef,
        D_PA = complexDiffusCoef,
        ka1 = assocRate1,
        kd1 = dissocRate1,
        ka2 = assocRate2,
        kd2 = dissocRate2,
        ka3 = assocRate3,
        kd3 = dissocRate3,
        ka4 = assocRate4,
        kd4 = dissocRate4,
        L = milliToNormal(length),
        U = s4cmToMPS(flowRate),
        thickness = milliToNormal(thickness),
        width = milliToNormal(width),
        C = s4cmToMPS(initVelocity),
        r = velocityDecay
    )
    
    response = {
        "dist": optimal_dist,       # test line distance, in mm
        "time": time_point,         # time needed for the process (reaction time)
        "samplevol": volume         # optimal volume of the sample (analyte?) to reach the sensitivity
    }

    print('sending response of:', response) 
    return _corsify_actual_response(jsonify(response))


koffiDbUrl = "http://koffidb.org/api/interactions/?format=json&page_size=2000&filters=%28koff%21%3Dnull%29%26%28kon%21%3Dnull%29"

# API urls
@app.route('/api/koffi', methods=['GET', 'OPTIONS'])
def koffi():
    if request.method == 'OPTIONS': return build_cors_preflight()

    koffiData = requests.get(koffiDbUrl).content
    response = json.loads(koffiData)

    return _corsify_actual_response(jsonify(response))

# Serve static React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def sserve(path):
    if path.startswith('/api/'):
        return send_from_directory(app.static_folder, '405.html')
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    #app.run(use_reloader=True, port=5000, threaded=True) # debug only
    serve(app, host='0.0.0.0', port=5000, url_scheme='https') # production
