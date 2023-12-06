from model import db, Memory
from datetime import datetime
from flask import jsonify
from sqlalchemy import func, or_, and_


def create_user():
    pass

def create_memory(name, date, note):
    memory = Memory(name=name, note=note, date=date, created=datetime.now(), updated=datetime.now())
    db.session.add(memory)
    db.session.commit()
    return Memory

def create_picture():
    pass

def get_user_by_email():
    pass

def get_user_by_username():
    pass

def get_all_memories():
    memories = Memory.query
    memories_list = [
        {
            "name": memory.name,
            "note": memory.note,
            "date": memory.date.strftime("%Y-%m-%d"),  # Format the date as a string
            "created": memory.created.strftime("%Y-%m-%d %H:%M:%S"),
            "updated": memory.updated.strftime("%Y-%m-%d %H:%M:%S")
        }
        for memory in memories
    ]
    return jsonify(memories_list)