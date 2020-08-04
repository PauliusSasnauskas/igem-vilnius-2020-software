#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration

class DatabaseDriver(object):
	conn = None
	conf = Configuration('postgresql')
	params = conf.getParams()
	def __init__(self):
		self.cur = None
	
	def connect():
		try:
			conn = psycopg2.connect(**params)
			# create a cursor
			self.cur = conn.cursor()
			#cur.close()
		except (Exception, psycopg2.DatabaseError) as error:
			print(error)
			
	def getCursor(self):
		return self.cur

	def close():
		if conn is not None:
			conn.close()

