ALTER TABLE MarkersResults
    ADD COLUMN selected boolean NOT NULL DEFAULT FALSE;

ALTER TABLE MarkersResults 
    DROP COLUMN bac_name;

ALTER TABLE MarkersResults 
    ADD COLUMN strain_id integer REFERENCES Strains(bacdive_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE;

ALTER TABLE Strains
    ADD COLUMN bac_name VARCHAR NOT NULL;