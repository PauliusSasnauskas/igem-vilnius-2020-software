#! /usr/bin/env python
# - * -coding: utf - 8 - * -
    
from configparser import ConfigParser

class Configuration(object):
	filename = 'authorization.ini'
    # create a parser
	parser = ConfigParser()
	# read config file
	parser.read(filename)

	def __init__(self, section):
		self.auth = {}
		self.section = section
		
	def getParams(self):
		if self.parser.has_section(self.section):
			params = self.parser.items(self.section)
			for param in params:
				self.auth[param[0]] = param[1]
		else :
			raise Exception('Section {0} not found in the {1} file'.format(self.section, self.filename))
		return self.auth