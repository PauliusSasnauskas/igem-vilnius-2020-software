#IMPORTANT: Before running, install flask and waitress modules with commands
#                  `python -m pip install flask`
#                  `python -m pip install waitress`

import os
from flask import Flask, send_from_directory, request, jsonify, make_response
from waitress import serve
import lfa_test_line_location_function
import lfa_time_volume_function

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

# API urls
@app.route('/api/calculate', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS': return build_cors_preflight()

    data = request.json
    print('got request of:', data) 
    
    # data object interface:
    # {
    #   flowRate : number,
    #   diffusCoef : number,
    #   aCoef : number,
    #   pCoef : number,
    #   rCoef : number,
    #   assocRate : number,
    #   dissocRate : number,
    # }

    x_opt = lfa_test_line_location_function.lfa_test_line_location(data.get("aCoef"), data.get("pCoef"), data.get("rCoef"), data.get("diffusCoef"), 1e-12, data.get("assocRate"), data.get("dissocRate"))
    print(x_opt)
    print(x_opt.astype(float))
    t, volume = lfa_time_volume_function.lfa_time_volume(x_opt.astype(float), data.get("aCoef"), data.get("pCoef"), data.get("rCoef"), data.get("diffusCoef"), 1e-12, data.get("assocRate"), data.get("dissocRate"))
    
    response = {
        "dist": x_opt.astype(float),    # test line distance, in mm
        "time": t,                      # time needed for the process (reaction time)
        "samplevol": volume             # optimal volume of the sample (analyte?) to reach the sensitivity
    }

    print('sending response of:', response) 
    return _corsify_actual_response(jsonify(response))

# Serve static React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def sserve(path):
    if path.startswith('/api/'):
        raise Exception()
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True) # debug only
    # serve(app, host='0.0.0.0', port=5000) # production
