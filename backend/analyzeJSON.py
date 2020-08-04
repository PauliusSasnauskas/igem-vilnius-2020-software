#! /usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sys, requests
from operator import itemgetter
from databaseDriver import DatabaseDriver


class JSONAnalyzer(object):
	#TODO: get parameters from database with JID key
	def __init__(self, data,jid):
		self.data = data
		self.jid = jid
		self.sequence_type = None
		self.sequence_length_min = None
		self.sequence_length_max = None
		
	def getBacteriaName(self):
		return self.data.get("taxonomy_name").get("strains")[0].get("species")
	
	#def getMarkerProperties():
		

	def getMarkerSequences(self):
		sequenceList = []
		sequences = self.data.get("molecular_biology").get("sequence")
		for i in range(len(sequences)):
			accession_id = sequences[i].get("seq_acc_num")
			accession_title = sequences[i].get("Sequence_accession_title");
			sequence_length = sequences[i].get("sequence_length")
			evaluation = 0;
			if(self.sequence_type in accession_title):
				evaluation += 1
			if(sequence_length is not None):
				if(self.sequence_length_min <= sequence_length <= self.sequence_length_max):
					evaluation += 2
				elif(self.sequence_length_min <= sequence_length or sequence_length <= self.sequence_length_max):
					evaluation += 1
			if("intergenic" not in accession_title):
				evaluation += 1
			sequenceInfo = {"id": accession_id, "title": accession_title, "length": sequence_length, "seq_eval": evaluation}
			sequenceList.append(sequenceInfo)
		return sorted(sequenceList, key=itemgetter('seq_eval'), reverse=True)

	def getFullInfo(self):
		return {self.getBacteriaName(): self.getMarkerSequences()}

	#server = "http://www.ebi.ac.uk/ena/data/view/"
	#display_type = "&display=fasta"
	#        r = requests.get(server+accession_id+display_type, headers={ "Content-Type" : "text/x-fasta"})
	#
	#        if not r.ok:
	#            r.raise_for_status()
	#            sys.exit()
	#
	#
	#        print(r.text)
