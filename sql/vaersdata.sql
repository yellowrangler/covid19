CREATE TABLE vaersdatatbl (
	vaers_id int(6) NOT NULL, 
	recvdate date NOT NULL, 
	state varchar(3) NOT NULL, 
	age_yrs varchar(15) NOT NULL, 
	cage_yr varchar(15) NOT NULL, 
	cage_mo varchar(15) NOT NULL, 
	sex varchar(2) NOT NULL, 
	rpt_date varchar(15),    --- discontinued 
	symptom_text text NOT NULL,
	died varchar(2) NOT NULL, 
	datedied date NOT NULL, 
	l_threat varchar(2) NOT NULL, 
	er_visit varchar(2) NOT NULL,  --- discontinued 
	hospital varchar(2) NOT NULL, 
	hospdays int NOT NULL, 
	x_stay varchar(2) NOT NULL, 
	disable varchar(2) NOT NULL, 
	recovd varchar(2) NOT NULL, 
	vax_date date NOT NULL, 
	onset_date date NOT NULL, 
	numdays int NOT NULL, 
	lab_data text NOT NULL, 
	v_adminby varchar(4) NOT NULL, 
	v_fundby varchar(4) NOT NULL, 
	other_meds varchar(241) NOT NULL, 
	cur_ill text NOT NULL, 
	history text NOT NULL, 
	prior_vax varchar(129) NOT NULL, 
	splttype varchar(26) NOT NULL, 
	form_vers varchar(2) NOT NULL, 
	todays_date date NOT NULL, 
	birth_defect varchar(2) NOT NULL, 
	ofc_visit varchar(2) NOT NULL, 
	er_ed_visit varchar(2) NOT NULL, 
	allergies text NOT NULL,
PRIMARY KEY (vaers_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2021VAERSData/2021VAERSDATA.csv'
INTO TABLE vaersdatatbl
FIELDS TERMINATED BY ','
(vaers_id,@var_recvdate,state,age_yrs,cage_yr,cage_mo,sex,rpt_date,symptom_text,died,@var_datedied,l_threat,er_visit,hospital,hospdays,x_stay,disable,recovd,@var_vax_date,@var_onset_date,numdays,lab_data,v_adminby,v_fundby,other_meds,cur_ill,history,prior_vax,splttype,form_vers,@var_todays_date,birth_defect,ofc_visit,er_ed_visit,allergies)
SET recvdate = STR_TO_DATE(@var_recvdate, '%m/%d/%Y'),
	datedied = STR_TO_DATE(@var_datedied, '%m/%d/%Y'),
	vax_date = STR_TO_DATE(@var_vax_date, '%m/%d/%Y'),
	onset_date = STR_TO_DATE(@var_onset_date, '%m/%d/%Y'),	
	todays_date = STR_TO_DATE(@var_todays_date, '%m/%d/%Y');

LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2020VAERSData/2020VAERSDATA.csv'
INTO TABLE vaersdatatbl
FIELDS TERMINATED BY ','
(vaers_id,@var_recvdate,state,age_yrs,cage_yr,cage_mo,sex,rpt_date,symptom_text,died,@var_datedied,l_threat,er_visit,hospital,hospdays,x_stay,disable,recovd,@var_vax_date,@var_onset_date,numdays,lab_data,v_adminby,v_fundby,other_meds,cur_ill,history,prior_vax,splttype,form_vers,@var_todays_date,birth_defect,ofc_visit,er_ed_visit,allergies)
SET recvdate = STR_TO_DATE(@var_recvdate, '%m/%d/%Y'),
	datedied = STR_TO_DATE(@var_datedied, '%m/%d/%Y'),
	vax_date = STR_TO_DATE(@var_vax_date, '%m/%d/%Y'),
	onset_date = STR_TO_DATE(@var_onset_date, '%m/%d/%Y'),	
	todays_date = STR_TO_DATE(@var_todays_date, '%m/%d/%Y');	


CREATE TABLE vaersvaxtbl (
	vaers_id int(6) NOT NULL, 
	vax_type varchar(16) NOT NULL,
	vax_manu varchar(41) NOT NULL,
	vax_lot varchar(16) NOT NULL,
	vax_dose_series varchar(4) NOT NULL,
	vax_route varchar(6) NOT NULL,
	vax_site varchar(7) NOT NULL,
	vax_name varchar(101) NOT NULL,
PRIMARY KEY (vaers_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2021VAERSData/2021VAERSVAX.csv'
INTO TABLE vaersvaxtbl
FIELDS TERMINATED BY ','
(vaers_id,vax_type,vax_manu,vax_lot,vax_dose_series,vax_route,vax_site,vax_name);

LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2020VAERSData/2020VAERSVAX.csv'
INTO TABLE vaersvaxtbl
FIELDS TERMINATED BY ','
(vaers_id,vax_type,vax_manu,vax_lot,vax_dose_series,vax_route,vax_site,vax_name);

CREATE TABLE vaerssympptonstbl (
	vaers_id int(6) NOT NULL, 
	symptom1 varchar(101) NOT NULL,
	symptomversion1 varchar(6) NOT NULL,
	symptom2 varchar(101) NOT NULL,
	symptomversion2 varchar(6) NOT NULL,
	symptom3 varchar(101) NOT NULL,
	symptomversion3 varchar(6) NOT NULL,
	symptom4 varchar(101) NOT NULL,
	symptomversion4 varchar(6) NOT NULL,
	symptom5 varchar(101) NOT NULL,
	symptomversion5 varchar(6) NOT NULL,
PRIMARY KEY (vaers_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2021VAERSData/2021VAERSSYMPTOMS.csv'
INTO TABLE vaerssympptonstbl
FIELDS TERMINATED BY ','
(vaers_id,symptom1,symptomversion1,symptom2,symptomversion2,symptom3,symptomversion3,symptom4,symptomversion4,symptom5,symptomversion5);

LOAD DATA LOCAL INFILE '/home/pi/Development/covid19/data/vaers-data/2020VAERSData/2020VAERSSYMPTOMS.csv'
INTO TABLE vaerssympptonstbl
FIELDS TERMINATED BY ','
(vaers_id,symptom1,symptomversion1,symptom2,symptomversion2,symptom3,symptomversion3,symptom4,symptomversion4,symptom5,symptomversion5);

mysqldump --extended-insert=FALSE -u tarryc -p covid19 > covid19dump.sql
mysql -u tarryc -p covid19 < covid19dump.sql


