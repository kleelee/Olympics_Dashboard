import pandas as pd
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
import pymysql
from config import sqlpass
from flask import Flask

df = pd.read_csv("athlete_events.csv")

rds_connection_string = f"root:{sqlpass}@127.0.0.1/olympics_db?charset=utf8"
engine = create_engine(f'mysql://{rds_connection_string}', encoding='utf-8')

df.to_sql(name='athlete_events', con=engine, if_exists='append', index=False)

pd.read_sql_query('select * from athlete_events', con=engine).head(100) 

