Data sources
https://covid.cdc.gov/covid-data-tracker/#datatracker-home
https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data
https://covidtracking.com/analysis-updates/federal-covid-data-101-working-with-case-data
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



