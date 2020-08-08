CREATE TABLE Query (
	JID varchar(10) PRIMARY KEY,
	query_type BOOLEAN NOT NULL DEFAULT 'false',
	query_level BOOLEAN NOT NULL DEFAULT 'false',
	email varchar,
	query_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE Strains (
	bacdive_id int PRIMARY KEY,
	atcc int UNIQUE,
	dsm int UNIQUE,
	nctc int UNIQUE,
	bccm int UNIQUE,
	cip int UNIQUE,
	jcm int UNIQUE,
	nccb int UNIQUE,
	ncimb int UNIQUE,
	icmp int UNIQUE,
	cect int UNIQUE,
	ccug int UNIQUE
);

CREATE TABLE Taxonomy (
	tax_id int PRIMARY KEY,
	species_name varchar NOT NULL
);

CREATE TABLE Markers (
	JID varchar(10) REFERENCES Query (JID) ON UPDATE CASCADE ON DELETE CASCADE,
	marker_id serial,
	type varchar NOT NULL,
	min_length int DEFAULT '10',
	max_length int,
	intergenic BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT Markers_pk PRIMARY KEY (JID,marker_id)
);

CREATE TABLE MarkersResults(
	JID varchar(10) REFERENCES Query (JID) ON UPDATE CASCADE ON DELETE CASCADE,
	seq_eval int,
	embl_id varchar(8),
	bac_name varchar,
	length int,
	title varchar,
	CONSTRAINT MarkersResults_pk PRIMARY KEY (JID,embl_id)
);

CREATE TABLE Results (
	JID varchar(10) PRIMARY KEY REFERENCES Query (JID) ON UPDATE CASCADE ON DELETE CASCADE,
	F_primer varchar,
	R_primer varchar,
	D_probe varchar,
	Ca_probe varchar,
	Co_probe varchar
);

CREATE TABLE QueryStrains (
	JID varchar(10) REFERENCES Query (JID) ON UPDATE CASCADE ON DELETE CASCADE,
	bacdive_id int REFERENCES Strains (bacdive_id) ON UPDATE CASCADE,
	CONSTRAINT QueryStrains_pk PRIMARY KEY (JID,bacdive_id)
);

CREATE TABLE QueryTaxonomy (
	JID varchar(10) REFERENCES Query (JID) ON UPDATE CASCADE ON DELETE CASCADE,
	tax_id int REFERENCES Taxonomy (tax_id) ON UPDATE CASCADE,
	CONSTRAINT QueryTaxonomy_pk PRIMARY KEY (JID,tax_id)
);
