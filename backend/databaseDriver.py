#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration
from psycopg2 import sql
import random # generate job id
import string # get letter characters
from bacdiveAccess import BacdiveClient
from analyzeJSON import JSONAnalyzer

class DatabaseDriver:
	conf = Configuration('postgresql')
	params = conf.getParams()
	conn = psycopg2.connect(** params)
	#except (Exception, psycopg2.DatabaseError) as error:
	#	print(error)

	def getBacDiveID(self, culturecolnumber):
		cultureNr = culturecolnumber.split(" ", 1)
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
	
	def setMarkerSequencesResults(self, jid, seqList, bacdive_id):
		with self.conn.cursor() as cur:
			for i in seqList:
				cur.execute("INSERT INTO MarkersResults(jid, seq_eval, embl_id, length, title, strain_id) VALUES(%s,%s,%s,%s,%s,%s)", (jid, i.get('seq_eval'), i.get('id'), i.get('length'), i.get('title'),bacdive_id,))
				self.conn.commit()
				
	def setStrainIDs(self, idDict, bacdive_id, bac_name):
		with self.conn.cursor() as cur:
			cur.execute("select exists(select 1 from strains where bacdive_id=%s)", (bacdive_id,))
			result = cur.fetchone()
			if(result[0] is False):
				cur.execute("INSERT INTO Strains(bacdive_id, bac_name) VALUES(%s,%s)", (bacdive_id, bac_name,))
			for key in idDict:
				query = sql.SQL("UPDATE Strains SET {name} = %s WHERE bacdive_id = %s").format(name=sql.Identifier(key.lower()))
				cur.execute(query, (idDict.get(key), bacdive_id))
			self.conn.commit()
				
	def setQueryStrains(self,jid,bacdive_id):
		with self.conn.cursor() as cur:
			cur.execute("INSERT INTO Strains(bacdive_id) VALUES(%s) ON CONFLICT DO NOTHING", (bacdive_id,))
			cur.execute("INSERT INTO QueryStrains(JID, bacdive_id) VALUES(%s, %s) ON CONFLICT DO NOTHING", (jid, bacdive_id,))
				
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

			cur.execute("INSERT INTO Query(jid, query_type) VALUES(%s, %s)", (jid, data.get('isProbe'))) # insert query
			for strain in data['taxIds']:	# insert taxids
				# TODO: get species_name?
				cur.execute("INSERT INTO Taxonomy(tax_id, species_name) VALUES(%s, %s) ON CONFLICT DO NOTHING", (strain, "N/A"))
				cur.execute("INSERT INTO QueryTaxonomy(JID, tax_id) VALUES(%s, %s)", (jid, strain))
			for strain in data['sequenceTypes']:
				min = strain.get('min', 10)
				if 'max' in strain:
					cur.execute("INSERT INTO Markers(JID, type, min_length, max_length, intergenic) VALUES(%s,%s,%s,%s,%s)", (jid, strain['val'], min, strain['max'], not data['excludeIntergenic'],))
				else:
					cur.execute("INSERT INTO Markers(JID, type, min_length, intergenic) VALUES(%s,%s,%s,%s)", (jid, strain['val'], min, not data['excludeIntergenic'],))
			markerResults = []
			for strain in data['strainIds']:
				bacdiveClient = BacdiveClient(jid, self.getBacDiveID(strain))
				bacdiveData = bacdiveClient.getDataByBacdiveId(strain)
				bacdive_id = bacdiveClient.bacdive_id
				self.setQueryStrains(jid, bacdive_id) # set query strains with bacdive_id

				markerProperties = data['sequenceTypes']
				json_analyzer = JSONAnalyzer(bacdiveData, jid)
				json_analyzer.setMarkerProperties(markerProperties[0], data['excludeIntergenic']) # TODO: markerProperties[1..n]
				sequenceList = json_analyzer.evaluateSequences() # get marker sequences available for further analysis
				bac_name = json_analyzer.getBacteriaName()
				self.setStrainIDs(json_analyzer.extractStrainIDs(bacdive_id), bacdive_id, bac_name) # set strain alternative ids
				self.setMarkerSequencesResults(jid, sequenceList, bacdive_id)
				markerResults += [{"for": bacdive_id, "name": bac_name, "sequenceList": sequenceList}]
			self.conn.commit()
		return {"jid": jid, "subSelect": markerResults}
	
	def setJobMarkers(self, jid, selection):
		with self.conn.cursor() as cur:
			for item in selection:
				cur.execute("UPDATE markersresults SET selected = TRUE WHERE jid = %s AND embl_id = %s;", (jid, item,))
			self.conn.commit()
		
