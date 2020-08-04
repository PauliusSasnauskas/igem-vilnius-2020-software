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
from databaseDriver import DatabaseDriver

class BacdiveClient(object):
    headers = {'Accept': 'application/json'}
    #reading authorization details from file
    conf = Configuration('bacdive')
    params = conf.getParams()
    USERNAME = params.get('username')
    PASSWORD = params.get('password')
    credentials = HTTPBasicAuth(USERNAME, PASSWORD)
        
    def __init__(self, culturecolnumber, jid, db_driver):
        self.culturecolnumber = culturecolnumber
        self.jid = jid
        self.db_driver = db_driver
        
    def getLinkByCultureno(self):
        response = requests.get('https://bacdive.dsmz.de/api/bacdive/culturecollectionno/%s/' % (self.culturecolnumber), headers=self.headers,auth=self.credentials)
        if response.status_code == 200:
            #if url found by the culture number, get api link
            culture_url = response.json()
            return culture_url[0].get('url')
            #TODO: catch errors
                    
    def getJSONByBacdiveID(self):
	#check if culture no is found in database table "strains". If yes, access bacdive DB with bacdive ID. If no, search by Culture No.
        bacdive_id = db_driver.findBacDiveID(self.culturecolnumber)
        print(type(bacdive_id))
        culturenoURL = ""
        if(bacdive_id is None):
              culturenoURL = self.getLinkByCultureno()
        else:
              culturenoURL = 'https://bacdive.dsmz.de/api/bacdive/bacdive_id/' + str(bacdive_id)
        results_response = requests.get(url = culturenoURL, headers=self.headers,auth=self.credentials);
        if results_response.status_code == 200:
            results = results_response.json()
            return results
    #TODO: catch errors
        
    def run(self):
        org_results = JSONAnalyzer(self.getJSONByBacdiveID(), self.jid).getFullInfo() #returns marker sequences available for further analysis
        #TODO: put results to markerResults table
        for x, y in org_results.items():
            print(x)		#returns species name
            for i in range(len(y)):
                print(y[i]) #returns available marker sequences for the species

if __name__ == '__main__':
    #command line parameters (culture ID) for query
    #TODO: take parameters from database with JID key
    arguments = sys.argv[2:]
    jid = sys.argv[1]
    db_driver = DatabaseDriver()
    db_driver.connect()
    for i in range(len(arguments)):
        BacdiveClient(arguments[i], jid, db_driver).run()

