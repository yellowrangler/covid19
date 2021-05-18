Data sources
https://covid.cdc.gov/covid-data-tracker/#datatracker-home
https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data
https://covidtracking.com/analysis-updates/federal-covid-data-101-working-with-case-data   *****
https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36  ****
https://data.cdc.gov/Case-Surveillance/COVID-19-Case-Surveillance-Public-Use-Data/vbim-akqf
https://catalog.data.gov/dataset/united-states-covid-19-cases-and-deaths-by-state-over-time

CDC Description                     CDC Column Name         CTP API Field Name      Tarrys take
Date of counts                      submission_date         date
Date and time record was created    created_at              lastUpdatedEt           
Total number of cases               tot_cases               positive                Total cases since count started
Total confirmed cases               conf_cases              positiveCasesViral
Total probable cases                prob_cases              probableCases
Number of new cases                 new_case                positiveIncrease*       New cases for submit date
Number of new probable cases        pnew_case               N/A
Total number of deaths              tot_death               death                   Total cases since count started
Total number of confirmed deaths    conf_death              deathConfirmed
Total number of probable deaths     prob_death              deathProbable           New cases for submit date
Number of new deaths                new_death               deathIncrease*
Number of new probable deaths       pnew_death              N/A
Jurisdiction                        state                   state
If Agree, then confirmed 
and probable cases are included. 
If Not Agree, only total cases.     consent_cases           N/A
If Agree, then confirmed 
and probable deaths are included. 
If Not Agree, only total deeaths.   pnew_death              N/A

* positiveIncrease and death increase represent the difference from previous day 
topline metrics rather than actual new cases/deaths on a given day

http://172.20.10.9/covid19/#/home

cdccasesdeathsbystate.tbl 

DROP TABLE cdccasesdeathsbystatetbl;
CREATE TABLE cdccasesdeathsbystatetbl (
            id INT NOT NULL AUTO_INCREMENT,
            submission_date DATE NOT NULL,
            state VARCHAR(3) NOT NULL,
            tot_cases INT(10) UNSIGNED DEFAULT 0,
            conf_cases INT(10) UNSIGNED DEFAULT 0,
            prob_cases INT(10) UNSIGNED DEFAULT 0,
            new_case INT(10) UNSIGNED DEFAULT 0,
            pnew_case INT(10) UNSIGNED DEFAULT 0,
            tot_death INT(10) UNSIGNED DEFAULT 0,
            conf_death INT(10) UNSIGNED DEFAULT 0,
            prob_death INT(10) UNSIGNED DEFAULT 0,
            new_death INT(10) UNSIGNED DEFAULT 0,
            pnew_death INT(10) UNSIGNED DEFAULT 0,
            created_at VARCHAR(255) NOT NULL,
            consent_cases VARCHAR(255) NOT NULL,
            consent_deaths VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
);

DROP TABLE covid19alltexttbl;
CREATE TABLE covid19alltexttbl (
            id INT NOT NULL AUTO_INCREMENT,
            submission_date DATE NOT NULL,
            state VARCHAR(3) NOT NULL,
            tot_cases VARCHAR(255),
            conf_cases VARCHAR(255),
            prob_cases VARCHAR(255),
            new_case VARCHAR(255),
            pnew_case VARCHAR(255),
            tot_death VARCHAR(255),
            conf_death VARCHAR(255),
            prob_death VARCHAR(255),
            new_death VARCHAR(255),
            pnew_death VARCHAR(255),
            created_at VARCHAR(255) NOT NULL,
            consent_cases VARCHAR(255) NOT NULL,
            consent_deaths VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
);

LOAD DATA INFILE '/home/tarryc/Development/covid19/data/United_States_COVID-19_Cases_and_Deaths_by_State_over_Time_noheaders_A.csv'
INTO TABLE covid19tbl
FIELDS TERMINATED BY ','
(@var_submission_date,state,tot_cases,conf_cases,prob_cases,new_case,pnew_case,tot_death,conf_death,prob_death,new_death,pnew_death,created_at,consent_cases,consent_deaths) 
SET submission_date = STR_TO_DATE(@var_submission_date, '%m/%d/%Y');

LOAD DATA INFILE '/home/tarryc/Development/covid19/data/United_States_COVID-19_Cases_and_Deaths_by_State_over_Time_noheaders_B.csv'
INTO TABLE covid19tbl
FIELDS TERMINATED BY ','
(@var_submission_date,state,tot_cases,conf_cases,prob_cases,new_case,pnew_case,tot_death,conf_death,prob_death,new_death,pnew_death,created_at,consent_cases,consent_deaths) 
SET submission_date = STR_TO_DATE(@var_submission_date, '%m/%d/%Y');


-- read one of the field to variable
-- format this date-time variable


submission_date,state,tot_cases,conf_cases,prob_cases,new_case,pnew_case,tot_death,conf_death,prob_death,new_death,pnew_death,created_at,consent_cases,consent_deaths

mysqldump --extended-insert=FALSE -u tarryc -p covid19 > covid19dump.sql

mysql -u tarryc -p covid19 < covid19dump.sql

select submission_date, state, new_death from covid19tbl order by submission_date

select submission_date, state, new_death from covid19tbl order by submission_date wwhere state = 'NY'

select submission_date, state, new_death 
from cdccasesdeathsbystatetbl 
where state = 'MA'
order by submission_date 

select 
submission_date,
state,
tot_cases,
conf_cases,
new_case,
tot_death,
conf_death,
new_death
from covid19tbl 
order by state, submission_date


charts

line chart deaths for state since start to last data. x axis days, y axis number 
line chart line for deaths, line for new cases for state since start to last data. x axis days, y axis number 

line chart deaths for all states since start to last data. x axis days, y axis number 
line chart line for deaths, line for new cases for all states since start to last data. x axis days, y axis number 

line chart deaths for 2 states since start to last data. x axis days, y axis number 
line chart line for deaths, line for new cases for 2 states since start to last data. x axis days, y axis number 

bar chart total deaths for all states since start to last data. x axis days, y axis number 
bar chart bar for deaths, bar for new cases for all states since start to last data. x axis days, y axis number 


Other things to consider
Monthly totals comapre
Show top 5 states in deaths
Show list of states best/worst toggle sort by death totals by month, year
