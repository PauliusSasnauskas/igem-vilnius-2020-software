#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration
from psycopg2 import sql

class DatabaseDriver(object):
	conn = None
	conf = Configuration('postgresql')
	params = conf.getParams()
	def __init__(self):
		self.cur = None
	
	def connect(self):
		try:
			conn = psycopg2.connect(**DatabaseDriver.params)
			# create a cursor
			self.cur = conn.cursor()
			#cur.close()
		except (Exception, psycopg2.DatabaseError) as error:
			print(error)
	
	def getBacDiveID(self, culturecolnumber):
                cultureNr = culturecolnumber.split()
                idName = "strain_"+cultureNr[0].lower()
                idNr = cultureNr[1]
                query = sql.SQL("select bacdive_id from strains where {name} = %s").format(name=sql.Identifier(idName))
                self.cur.execute(query, (idNr,))
                result = self.cur.fetchone()
                return result[0]

    def getMarkerProperties(self, jid):
                self.cur.execute("select type, min_length, max_length, intergenic from markers where jid = %s", (jid,))
                result = self.cur.fetchall()
                return result
	def close():
		if conn is not None:
			conn.close()

