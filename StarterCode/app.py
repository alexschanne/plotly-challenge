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
def index():
    """Return Homepage."""
    return render_template("index.html")

@app.route("/names")
def names():
    """Return list of sample names."""
    #Use Pandas to perform sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    #list column sample names
    return jsonify(list(df.columns)[2:])

@app.route("/metadata/<sample>")
def Samples_metadata(sample):
    """Return the MetaData for a given sample."""
    sel = [
        Samples_metadata.sample,
        Samples_metadata.ETHNICITY,
        Samples_metadata.GENDER,
        Samples_metadata.AGE,
        Samples_metadata.LOCATION,
        Samples_metadata.BBTYPE,
        Samples_metadata.WFREQ,
    ]

    results = db.session.query(*sel).filter(Samples_metadata.sample == sample).all()

    #Create dictionary for each row
    sample_rows = {}
    for result in results:
        sample_rows["sample"] = result[0]
        sample_rows["ETHNICITY"] = result[1]
        sample_rows["GENDER"] = result[2]
        sample_rows["AGE"] = result[3]
        sample_rows["LOCATION"] = result[4]
        sample_rows["BBTYPE"] = result[5]
        sample_rows["WFREQ"] = result[6]
    print(sample_rows)
    return jsonify(sample_rows)

@app.route("/samples/<samples>")
    """Return 'otu_ids', 'otu_labels', and 'sample_values'."""
    stmt - db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    #Filter data by number and only keep rows >1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

    #sorting by sample
    sample_data.sort_values(by = sample, ascending = False, inplace = True)

    #Format as json to send
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist()
    }
    return jsonify(data)
    
if __name__ == "__main__":
    app.run()