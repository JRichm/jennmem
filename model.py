from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, mapped_column, Mapped
from typing import List

import os
from dotenv import load_dotenv

load_dotenv()

# from dotenv import load_dotenv
# load_dotenv()

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
    created = db.Column(db.Date(), nullable=False)
    updated = db.Column(db.Date(), nullable=False)


class Memory(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    note = db.Column(db.String(), nullable=False, unique=True)
    pictures = relationship("Picture", back_populates="memory")
    date = db.Column(db.Date(), nullable=False)
    created = db.Column(db.Date(), nullable=False)
    updated = db.Column(db.Date(), nullable=False)


class Picture(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    note = db.Column(db.String(), nullable=False)
    memory_id = db.Column(db.Integer, ForeignKey("memory.id"))
    memory = relationship("Memory", back_populates="pictures")
    created = db.Column(db.Date(), nullable=False)
    updated = db.Column(db.Date(), nullable=False)


def connect_to_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    db.app = app
    db.init_app(app)

    print('connected to the db!')