#imports
import os
import pandas as import pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import sqlalchemy

#initiate app
app = Flask(__name__)

###### Database Setup#######
app.config["SQLACHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

#existing database into new model
Base = automap_base()
Base.prepare(db.engine, reflect = True)

#save references to each table
Samples_metadata = base.classes.Samples_metadata
Samples = Base.classes.samples

@app.route("/")






@app.route("/names")






@app.route("/metadata/<sample>")





@app.route("/samples/<samples>")






if __name__ == "__main__":
    app.run()