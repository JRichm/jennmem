from model import db, Memory, Picture
from datetime import datetime
from flask import jsonify
from sqlalchemy import func, or_, and_


def create_user():
    pass

def create_memory(name, date, note):
    memory = Memory(name=name, note=note, date=date, created=datetime.now(), updated=datetime.now())
    db.session.add(memory)
    db.session.commit()
    return memory

def create_picture(picture_data, memory_id):
    picture = Picture(data=picture_data, memory_id=memory_id, created=datetime.now(), updated=datetime.now())
    db.session.add(picture)
    db.session.commit()
    return picture

def get_user_by_email():
    pass

def get_user_by_username():
    pass

def get_all_memories():
    memories = Memory.query
    memories_list = [
        {
            "id": memory.id,
            "name": memory.name,
            "note": memory.note,
            "date": memory.date.strftime("%Y-%m-%d"),  # Format the date as a string
            "created": memory.created.strftime("%Y-%m-%d %H:%M:%S"),
            "updated": memory.updated.strftime("%Y-%m-%d %H:%M:%S")
        }
        for memory in memories
    ]
    return jsonify(memories_list)