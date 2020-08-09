#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration
from psycopg2 import sql
import random # generate job id
import string # get letter characters
from bacdiveAccess import BacdiveClient
from analyzeJSON import JSONAnalyzer

class DatabaseDriver(object):
	conf = Configuration('postgresql')
	params = conf.getParams()
	conn = psycopg2.connect(** params)
	#except (Exception, psycopg2.DatabaseError) as error:
	#	print(error)

	def getBacDiveID(self, culturecolnumber):
		cultureNr = culturecolnumber.split()
		idNr = cultureNr[1]
		query = sql.SQL("select bacdive_id from strains where {name} = %s").format(name=sql.Identifier(cultureNr[0].lower()))
		with self.conn.cursor() as cur:
			cur.execute(query, (idNr,))
			result = cur.fetchone()
			#TODO: add error handling if for some reason more than 1 row is returned
			if(result is None):
				return result
			else:
				return result[0]

	def getMarkerProperties(self, jid):
		with self.conn.cursor() as cur:
			cur.execute("select type, min_length, max_length, intergenic from markers where jid = %s", (jid,))
			result = cur.fetchall()
			return result
	
	def setMarkerSequencesResults(self, jid, seqList):
		with self.conn.cursor() as cur:
			for i in seqList:
				cur.execute("INSERT INTO MarkersResults(jid, seq_eval, embl_id, length, title) VALUES(%s, %s,%s,%s,%s)", (jid, i.get('seq_eval'), i.get('id'), i.get('length'), i.get('title'),))
				self.conn.commit()
				
	def setStrainIDs(self, idDict, bacdive_id):
		with self.conn.cursor() as cur:
			cur.execute("select exists(select 1 from strains where bacdive_id=%s);", (bacdive_id,))
			result = cur.fetchone()
			if(result[0] is False):
				cur.execute("INSERT INTO Strains(bacdive_id) VALUES(%s)", (bacdive_id,))
			for key in idDict:
				query = sql.SQL("UPDATE Strains SET {name} = %s WHERE bacdive_id = %s").format(name=sql.Identifier(key.lower()))
				cur.execute(query, (idDict.get(key), bacdive_id))
				self.conn.commit()
				
	def setQueryStrains(self,jid,bacdive_id):
		with self.conn.cursor() as cur:
			cur.execute("INSERT INTO QueryStrains VALUES(%s, %s) ON CONFLICT DO NOTHING", (jid, bacdive_id,))
				
	def close(self):
		if self.conn is not None:
			self.conn.close()
	
	def generateJobId(self):
		letters = string.ascii_letters + string.digits
		result_str = ''.join(random.choice(letters) for i in range(10))
		return result_str

	def createQuery(self, data):
		jid = 'unset'
		with self.conn.cursor() as cur:
			jid = self.generateJobId()
			# {
			#   'isProbe': False,
			#   'strainIds': ['ATC68463', 'IGEM-5-11-6'],
			#   'taxIds': [111, 322],
			#   'excludeIntergenic': True,
			#   'sequenceTypes': [
			#       { 'val': '23S rRNA', 'min': 10, 'max': 1500 },
			#       { 'val': '16S rRNA', 'min': 10, 'max': 1200 }
			#   ]
			# }

			
			cur.execute("INSERT INTO Query(jid, query_type) VALUES(%s, %s)", (jid, data['isProbe'])) # insert query
			for item in data['taxIds']:	# insert taxids
				cur.execute("INSERT INTO QueryTaxonomy(JID, tax_id) VALUES(%s, %s)", (jid, item))
			if 'sequenceTypes' in data:
				for item in data['sequenceTypes']:
					min = 10
					if 'min' in item:
						min = item['min']
					if 'max' in item:
						cur.execute("INSERT INTO Markers(JID, type, min_length, max_length, intergenic) VALUES(%s,%s,%s,%s,%s)", (jid, item['val'], min, item['max'], not data['excludeIntergenic'],))
					else:
						cur.execute("INSERT INTO Markers(JID, type, min_length, intergenic) VALUES(%s,%s,%s,%s)", (jid, item['val'], min, not data['excludeIntergenic'],))
			for item in data['strainIds']:
				bacdive_id = self.getBacDiveID(item) # get bacdive id
				bacd = BacdiveClient(jid, bacdive_id) # bacdive connection
				self.setQueryStrains(jid, bacd.bacdive_id) # set bacdive ids
				json_analyzer = JSONAnalyzer(bacd.getJSONByBacdiveID(item), jid) # initialize jsonanalyzer
				markerProperties = self.getMarkerProperties(jid) # get marker properties?
				json_analyzer.setMarkerProperties(markerProperties[0])
				json_results = json_analyzer.evaluateSequences() # get marker sequences available for further analysis
				strain_dict = json_analyzer.extractStrainIDs(bacd.bacdive_id) # get specific strain ids (ATCC, BCCM, etc.)
				self.setStrainIDs(strain_dict, bacd.bacdive_id)
				self.setMarkerSequencesResults(jid, json_results)
			self.conn.commit()
		return jid
