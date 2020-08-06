
import os
from flask import Flask, send_from_directory
from waitress import serve

app = Flask(__name__, static_folder='public')

# API urls
@app.route('/api/createJob')
def createJob():
    return 'Hello world!'

@app.route('/api/checkJob')
def checkJob():
    return 'Hello earth!'

# Serve static React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def sserve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True) # debug only
    # serve(app, host='0.0.0.0', port=8000) # production