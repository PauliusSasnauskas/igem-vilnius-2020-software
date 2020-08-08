from Bio import Entrez, SeqIO
from config import Configuration
import sys
from io import StringIO
from Bio.Align.Applications import MuscleCommandline

Entrez.tool = "probesolver"
conf = Configuration('ncbi')
params = conf.getParams()
Entrez.email = params.get('email')
Entrez.api_key = params.get('api_key')




def fetchSequences(seqList):
	sequences = ""
	for seq in range(len(seqList)):
		handle = Entrez.efetch(db="nucleotide", id=seqList[seq], rettype="fasta", retmode="text")
		sequence = handle.read()
		sequences += sequence
#		for seq_record in SeqIO.parse(StringIO(sequence), "fasta"):
#			print(seq_record.id)
#			print(seq_record.seq)
	return sequences
		
#def 
seqs = fetchSequences(sys.argv[1:])
print(seqs)
cline = MuscleCommandline(input="test.fa")
stdout, stderr = cline()


def cleanupFasta(result):
	lines = result.splitlines()
	seq = ""
	seqs = []
	for i in range(len(lines)):
		if ">" in lines[i]:
			if seq:
				seqs.append(seq)
				seq = ""
			next
		else:
			seq += lines[i]
	seqs.append(seq)
	return seqs
		
seqsClean = cleanupFasta(stdout)

def iterateSeqs(seqs):
	template = seqs[0]
	alignmentT = ""
	alignmentN = ""
	for i in range(len(seqs)):
		if i == 0:
			next
		else:
			alignmentN = ""
			for j in range(len(seqs[0])):
				if seqs[i][j] == template[j] and seqs[i][j]:
					alignmentT += "-"
					alignmentN += "-"
					next
				else:
					alignmentT += template[j]
					alignmentN += seqs[i][j]
	print(alignmentT)
	print(alignmentN)

iterateSeqs(seqsClean)
			
