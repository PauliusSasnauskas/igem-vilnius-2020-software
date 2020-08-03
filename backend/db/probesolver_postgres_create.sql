CREATE TABLE Query (
	JID varchar(10) PRIMARY KEY,
	query_type BOOLEAN NOT NULL DEFAULT 'false',
	query_level BOOLEAN NOT NULL DEFAULT 'false',
	email varchar,
	query_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE Strains (
	bacdive_id int PRIMARY KEY,
	strain_atcc int UNIQUE,
	strain_dsm int UNIQUE,
	strain_nctc int UNIQUE,
	strain_bccm int UNIQUE,
	strain_cip int UNIQUE,
	strain_jcm int UNIQUE,
	strain_nccb int UNIQUE,
	strain_ncimb int UNIQUE,
	strain_icmp int UNIQUE,
	strain_cect int UNIQUE,
	strain_ccug int UNIQUE
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
	marker_id serial,
	seq_eval int,
	embl_id varchar(8),
	length int,
	title varchar
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
