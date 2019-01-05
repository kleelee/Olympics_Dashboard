DROP DATABASE IF EXISTS olympics_db;

CREATE DATABASE olympics_db;

USE olympics_db;

CREATE TABLE athlete_events (
IND INT auto_increment PRIMARY KEY,
ID INT,
Name varchar(50),
Sex varchar(50),
Age INT,
Height INT,
Weight INT,
Team VARCHAR(50),
NOC VARCHAR(50),
Games VARCHAR(50),
Year INT,
Season Varchar(50),
City varchar(50),
Sport Varchar(50),
Event Varchar(100),
Medal Varchar(50)
);

SELECT * FROM athlete_events;
