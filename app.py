import pandas as pd
import numpy as np
from sqlalchemy import *
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import pymysql
from config import sqlpass
from flask import Flask
import json

df = pd.read_csv("athlete_events.csv")

rds_connection_string = f"root:{sqlpass}@127.0.0.1/olympics_db?charset=utf8"
engine = create_engine(f'mysql://{rds_connection_string}', encoding='utf-8')

#df.to_sql(name='athlete_events', con=engine, if_exists='append', index=False)

Base = automap_base()
Base.prepare(engine, reflect=True)
Athletes = Base.classes.athletes

session = Session(engine)

app = Flask(__name__)

@app.route("/api/v1.0/gold_athletes")
def gold_athletes():
    """Return the athletes data as json"""
    items = session.query(Athletes.Name, Athletes.Sex, Athletes.Team, Athletes.Sport, func.count(Athletes.Medal == "Gold")).\
    filter_by(Medal="Gold").\
    group_by(Athletes.Name).\
    order_by(func.count(Athletes.Medal == "Gold").desc()).limit(100)

    work = {'data': [
         {'Name':x.Name, 'Sex':
            x.Sex, 'Country' :x.Team, 'Sport': x.Sport, 'Gold Medals': x[4]}
        for x in items
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/silver_athletes")
def silver_athletes():
    """Return the athletes data as json"""
    items = session.query(Athletes.Name, Athletes.Sex, Athletes.Team, Athletes.Sport, func.count(Athletes.Medal == "Gold")).\
    filter_by(Medal="Silver").\
    group_by(Athletes.Name).\
    order_by(func.count(Athletes.Medal == "Silver").desc()).limit(100)

    work = {'data': [
         {'Name':x.Name, 'Sex':
            x.Sex, 'Country' :x.Team, 'Sport': x.Sport, 'Silver Medals': x[4]}
        for x in items
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/bronze_athletes")
def bronze_athletes():
    """Return the athletes data as json"""
    items = session.query(Athletes.Name, Athletes.Sex, Athletes.Team, Athletes.Sport, func.count(Athletes.Medal == "Gold")).\
    filter_by(Medal="Bronze").\
    group_by(Athletes.Name).\
    order_by(func.count(Athletes.Medal == "Bronze").desc()).limit(100)

    work = {'data': [
         {'Name':x.Name, 'Sex':
            x.Sex, 'Country' :x.Team, 'Sport': x.Sport, 'Bronze Medals': x[4]}
        for x in items
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/gold_countries")
def gold_countries():
    """Return the athletes data as json"""
    medalg = session.query( Athletes.Team, func.count(Athletes.Medal)).\
    filter(Athletes.Medal == "Gold").\
    group_by(Athletes.Team).\
    order_by(func.count(Athletes.Medal).desc()).all()

    work = {'data': [
         {'Country':x.Team,'Gold Medals': x[1]}
        for x in medalg
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/silver_countries")
def silver_countries():
    """Return the athletes data as json"""
    medalg = session.query( Athletes.Team, func.count(Athletes.Medal)).\
    filter(Athletes.Medal == "Silver").\
    group_by(Athletes.Team).\
    order_by(func.count(Athletes.Medal).desc()).all()

    work = {'data': [
         {'Country':x.Team,'Silver Medals': x[1]}
        for x in medalg
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/bronze_countries")
def bronze_countries():
    """Return the athletes data as json"""
    medalg = session.query( Athletes.Team, func.count(Athletes.Medal)).\
    filter(Athletes.Medal == "Bronze").\
    group_by(Athletes.Team).\
    order_by(func.count(Athletes.Medal).desc()).all()

    work = {'data': [
         {'Country':x.Team,'Bronze Medals': x[1]}
        for x in medalg
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/winter_events")
def winter_events():
    """Return the athletes data as json"""
    events_winter = session.query(Athletes.Year, Athletes.Season, func.count(distinct(Athletes.Sport))).\
    filter(Athletes.Season == "Winter").\
    group_by(Athletes.Year).\
    order_by((Athletes.Year).desc()).all()

    work = {'data': [
         {'Year':x.Year,'Season': x[2]}
        for x in events_winter
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

@app.route("/api/v1.0/summer_events")
def summer_events():
    """Return the athletes data as json"""
    events_summer = session.query(Athletes.Year, Athletes.Season, func.count(distinct(Athletes.Sport))).\
    filter(Athletes.Season == "Summer").\
    group_by(Athletes.Year).\
    order_by((Athletes.Year).desc()).all()

    work = {'data': [
         {'Year':x.Year,'Season': x[2]}
        for x in events_summer
       ]}

    jsonified_data = json.dumps(work)
    return jsonified_data

if __name__ == "__main__":
    app.run(debug=True)