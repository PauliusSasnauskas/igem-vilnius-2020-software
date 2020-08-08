#! /usr/bin/env python
# -*- coding: utf-8 -*-
#IMPORTANT: Before running, install requests module with command
#                  `python -m pip install requests`

import requests
from requests.auth import HTTPBasicAuth
import json
import sys
from analyzeJSON import JSONAnalyzer
from config import Configuration

class BacdiveClient(object):
    headers = {'Accept': 'application/json'}
    #reading authorization details from file
    conf = Configuration('bacdive')
    params = conf.getParams()
    USERNAME = params.get('username')
    PASSWORD = params.get('password')
    credentials = HTTPBasicAuth(USERNAME, PASSWORD)
        
    def __init__(self, jid, bacdive_id):
        self.jid = jid
		self.bacdive_id = bacdive_id
        
    def getLinkByCultureno(self):
        response = requests.get('https://bacdive.dsmz.de/api/bacdive/culturecollectionno/%s/' % (self.culturecolnumber), headers=self.headers,auth=self.credentials)
        if response.status_code == 200:
            #if url found by the culture number, get api link
            culture_url = response.json()
            return culture_url[0].get('url')
            #TODO: catch errors
                    
    def getJSONByBacdiveID(self):
        #check if culture no is found in database table "strains". If yes, access bacdive DB with bacdive ID. If no, search by Culture No.
        culturenoURL = ""
        if(self.bacdive_id is None):
            culturenoURL = self.getLinkByCultureno()
            self.bacdive_id = culturenoURL.split('/')[-2]
        else:
            culturenoURL = 'https://bacdive.dsmz.de/api/bacdive/bacdive_id/' + str(self.bacdive_id)
        results_response = requests.get(url = culturenoURL, headers=self.headers,auth=self.credentials);
        if results_response.status_code == 200:
            results = results_response.json()
            return results
        #TODO: catch errors             
        
                
if __name__ == '__main__':
    #command line parameters (culture ID) for query
    #TODO: take parameters from database with JID key
    arguments = sys.argv[2:]
    jid = sys.argv[1]
    db_driver = DatabaseDriver()
    for i in range(len(arguments)):
		bacdive_id = self.db_driver.getBacDiveID(self.culturecolnumber)
		bacd = BacdiveClient(jid, bacdive_id)
		self.db_driver.setQueryStrains(self.jid, bacd.bacdive_id)
		json_analyzer = JSONAnalyzer(bacd.getJSONByBacdiveID(bacd.bacdive_id), jid)
#		(self.sequence_type, self.sequence_length_min, self.sequence_length_max, self.intergenic) = self.db_driver.getMarkerProperties(self.jid)[0]
		json_results = json_analyzer.evaluateSequences() #returns marker sequences available for further analysis
		strain_dict = json_analyzer.extractStrainIDs(bacd.bacdive_id)
		self.db_driver.setStrainIDs(strain_dict, bacd.bacdive_id)
        db_driver.setMarkerSequencesResults(jid, json_results)
