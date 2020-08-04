#! /usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sys, requests
from operator import itemgetter

#TODO: get parameters from database with JID key
sequence_type = "16S"
sequence_length_min = 400
sequence_length_max = 600
def getBacteriaName(data):
    return data.get("taxonomy_name").get("strains")[0].get("species")

def getMarkerSequences(data):
	sequenceList = []
	sequences = data.get("molecular_biology").get("sequence")
	for i in range(len(sequences)):
		accession_id = sequences[i].get("seq_acc_num")
		accession_title = sequences[i].get("Sequence_accession_title");
		sequence_length = sequences[i].get("sequence_length")
		evaluation = 0;
		if(sequence_type in accession_title):
			evaluation += 1
		if(sequence_length is not None):
			if(sequence_length_min <= sequence_length <= sequence_length_max):
				evaluation += 2
			elif(sequence_length_min <= sequence_length or sequence_length <= sequence_length_max):
				evaluation += 1
		if("intergenic" not in accession_title):
			evaluation += 1
		sequenceInfo = {"id": accession_id, "title": accession_title, "length": sequence_length, "seq_eval": evaluation}
		sequenceList.append(sequenceInfo)
	return sorted(sequenceList, key=itemgetter('seq_eval'), reverse=True)
    
def getFullInfo(data):
	return {getBacteriaName(data): getMarkerSequences(data)}

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
