import pandas as pd
import numpy as np
# from sqlalchemy import *
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# import pymysql
from config import sqlpass
from flask import Flask, jsonify, render_template
import json

# rds_connection_string = f"root:{sqlpass}@127.0.0.1/olympics_db?charset=utf8"
# engine = create_engine(f'mysql://{rds_connection_string}', encoding='utf-8')

# if_exists could be 'replace' to save time, these two lines are commented out
# they add the data to the MySQL table

# df.to_sql(name='athletes', con=engine, if_exists='append', index=False)
# df1.to_sql(name='locations', con=engine, if_exists='append', index=False)

# Base = automap_base()
# Base.prepare(engine, reflect=True)
# Athletes = Base.classes.athletes
# Locations = Base.classes.locations

# session = Session(engine)
# session1 = Session(engine)
# session2 = Session(engine)
# session3 = Session(engine)
# session4 = Session(engine)

app = Flask(__name__)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index_original.html")

# @app.route("/api/v1.0/gold_athletes")
# def gold_athletes():
#     """Return the athletes data as json"""
#     items = session3.query(Athletes.Name, Athletes.Sex, Athletes.Team, Athletes.Sport, func.count(Athletes.Medal == "Gold")).\
#     filter_by(Medal="Gold").\
#     group_by(Athletes.Name).\
#     order_by(func.count(Athletes.Medal == "Gold").desc()).limit(12)

#     work = []
#     for x in items:
#         y = {"Name": x[0], "Sex": x[1], "Country": x[2], "Sport": x[3], "Gold_Medals":x[4]}
#         work.append(y)

#     jsonified_data = json.dumps(work)
    
#     return jsonified_data

# @app.route("/api/v1.0/gold_countries")
# def gold_countries():
#     """Return the athletes data as json"""
#     medalg = session.query( Athletes.Team, func.count(Athletes.Medal)).\
#     filter(Athletes.Medal == "Gold").\
#     group_by(Athletes.Team).\
#     order_by(func.count(Athletes.Medal).desc()).limit(15)

#     work = []
#     for x in medalg:
#         y = {"Country": x[0], "Medal_Count":x[1]}
#         work.append(y)

#     jsonified_data = json.dumps(work)
    
#     return jsonified_data


# @app.route("/api/v1.0/growth")
# def growth():
#     """Return the athletes data as json"""
#     transition = session2.query(Athletes.Year, Athletes.Season, func.count(distinct(Athletes.Name)), func.count(distinct(Athletes.Sport))).\
#     filter(Athletes.Season == "Summer").\
#     group_by(Athletes.Year).\
#     order_by((Athletes.Year).desc()).all()

#     work = []
#     for x in transition:
#         y = {"Year": x[0], "Season":x[1], "Name": x[2], "Sport": x[3]}
#         work.append(y)

#     jsonified_data = json.dumps(work)
    
#     return jsonified_data



# @app.route("/api/v1.0/growthwinter")
# def growthwinter():
#     """Return the athletes data as json"""
#     transition = session4.query(Athletes.Year, Athletes.Season, func.count(distinct(Athletes.Name)), func.count(distinct(Athletes.Sport))).\
#     filter(Athletes.Season == "Winter").\
#     group_by(Athletes.Year).\
#     order_by((Athletes.Year).desc()).all()

#     work = []
#     for x in transition:
#         y = {"Year": x[0], "Season":x[1], "Name": x[2], "Sport": x[3]}
#         work.append(y)

#     jsonified_data = json.dumps(work)
   
#     return jsonified_data

# @app.route("/api/v1.0/locations")
# def locations():
#     """Return the athletes data as json"""
#     locations1 = session1.query(Locations.Games, Locations.Year, Locations.Season, Locations.City, Locations.lat, Locations.lon, Locations.all_games, Locations.num).\
#                             order_by(Locations.Games).all()

    
#     work = []
#     for x in locations1:
#         y = {
#             "type": "Feature",
#             "geometry": {
#                 "type": "Point",
#                 "coordinates": [x[5],x[4]]
#             },
#             "properties": {
#                 "Games": x[0],
#                 "Year": x[1],
#                 "Season": x[2],
#                 "City": x[3],
#                 "all_games": x[6],
#                 "number": x[7]
#             }
#         }
#         work.append(y)
#     geo = {"type": "FeatureCollection", "features": work}

#     jsonified_data = json.dumps(geo)
    
#     return jsonified_data

if __name__ == "__main__":
    app.run(debug=True)