#! /usr/bin/env python
# -*- coding: utf-8 -*-
#IMPORTANT: Before running, install requests module with command
#                  `python -m pip install requests`

import requests
from requests.auth import HTTPBasicAuth
import json
import sys
import analyzeJSON
from config import Configuration

class BacdiveClient(object):

	headers = {'Accept': 'application/json'}
	#reading authorization details from file
	conf = Configuration('bacdive')
	params = conf.getParams()
	USERNAME = params.get('username')
	PASSWORD = params.get('password')
	credentials = HTTPBasicAuth(USERNAME, PASSWORD)
	
	def getLinkByCultureno(self,culturecolnumber):
		response = requests.get('https://bacdive.dsmz.de/api/bacdive/culturecollectionno/%s/' % (culturecolnumber), headers=self.headers,auth=self.credentials)
		if response.status_code == 200:
			#if url found by the culture number, get api link
			culture_url = response.json();
			results_response = requests.get(url = culture_url[0].get('url'), headers=self.headers,auth=self.credentials);
			results = results_response.json();
			return results
	def run(self):
		cultureno = self.getLinkByCultureno(culture_id) #returns full json file with culture information
		org_results = analyzeJSON.getFullInfo(cultureno) #returns marker sequences available for further analysis
		for x, y in org_results.items():
			print(x)		#returns species name
			for i in range(len(y)):
				print(y[i]) #returns available marker sequences for the species

if __name__ == '__main__':
	#command line parameters (culture ID) for query
	#TODO: take parameters from database with JID key
    arguments = sys.argv[1:]
    for i in range(len(arguments)):
        culture_id = arguments[i]
        BacdiveClient().run()

