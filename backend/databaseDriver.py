#! /usr/bin/env python
# -*- coding: utf-8 -*-

import psycopg2
from config import Configuration

def connect():
	conn = None
	try:
		# read connection parameters
		conf = Configuration('postgresql')
		params = conf.getParams()
		conn = psycopg2.connect(**params)

		# create a cursor
		cur = conn.cursor()
		cur.close()
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
	finally:
		if conn is not None:
			conn.close()


if __name__ == '__main__':
	connect()