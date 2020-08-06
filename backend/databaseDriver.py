#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration
from psycopg2 import sql

class DatabaseDriver(object):
	conf = Configuration('postgresql')
	params = conf.getParams()
	conn = psycopg2.connect(** params)
	#except (Exception, psycopg2.DatabaseError) as error:
	#	print(error)

	def getBacDiveID(self, culturecolnumber):
		cultureNr = culturecolnumber.split()
		idName = "strain_"+cultureNr[0].lower()
		idNr = cultureNr[1]
		query = sql.SQL("select bacdive_id from strains where {name} = %s").format(name=sql.Identifier(idName))
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
				cur.execute("INSERT INTO MarkersResults(jid,  seq_eval, embl_id, length, title) VALUES(%s, %s,%s,%s,%s)", (jid, i.get('seq_eval'), i.get('id'), i.get('length'), i.get('title'),))
				self.conn.commit()
	def close():
		if conn is not None:
			conn.close()
