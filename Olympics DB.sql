DROP DATABASE IF EXISTS olympics_db;

CREATE DATABASE olympics_db;

USE olympics_db;

CREATE TABLE athletes (
IND INT auto_increment PRIMARY KEY,
ID INT,
Name varchar(200),
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

CREATE TABLE locations (
ID INT auto_increment PRIMARY KEY,
Games VARCHAR(50),
Year INT,
Season Varchar(50),
City varchar(50),
lat FLOAT(10,6),
lon FLOAT(10,6),
all_games varchar(50),
num INT
);

SELECT * FROM athletes;
SELECT * FROM locations;
