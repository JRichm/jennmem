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

def get_memory_by_id(id):
    memory = Memory.query.filter(Memory.id == id).first()
    if memory is None:
        # Assuming query_memory_by_id returns None if memory is not found
        return jsonify({"error": "Memory not found"}), 404

    # Convert memory object to a dictionary before jsonify
    memory_dict = {
        "id": memory.id,
        "name": memory.name,
        "date": memory.date,
        "created": memory.created,
        "updated": memory.updated,
        # Add other fields as needed
    }

    return jsonify(memory_dict)

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

def get_pictures_from_memory_id(memory_id):
    pictures = Picture.query.filter(Picture.memory_id == memory_id)
    picture_list = [
        {
            "id": picture.id,
            "data": picture.data,
            "created": picture.created.strftime("%Y-%m-%d %H:%M:%S"),
            "updated": picture.updated.strftime("%Y-%m-%d %H:%M:%S")
        }
        for picture in pictures
    ]
    return jsonify(picture_list)