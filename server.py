import os
import json
import base64
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from model import connect_to_db, db
from datetime import datetime
from crud import create_user, create_memory, create_picture, get_user_by_email, get_user_by_username, get_all_memories, get_pictures_from_memory_id

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

@app.route('/register', methods=['GET','POST'])
def register():

    # get data from request
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
    else:
        username = request.args.get['username']
        email = request.args.get['email']
        password = request.args.get['password']

    # check if user already exists
    user = get_user_by_email(email)
    if not user:
        user = get_user_by_username(username)
    if user:
        return('user already exists')

    # hash password
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # create user object in database
    user = create_user(username, email, password_hash)
    return user


@app.route('/login', methods=['GET','POST'])
def login():
        username = request.form['username']
        password = request.form['password']

@app.route('/new_memory', methods=['GET','POST'])
def new_memory():
    data = request.json
    memoryName = data.get('memoryName')
    memoryDate = data.get('memoryDate')
    memoryDetails = data.get('memoryDetails')

    print('Creating memory:', memoryName, memoryDate, memoryDetails)

    memory = create_memory(memoryName, memoryDate, memoryDetails)
    return jsonify({"memoryId": memory.id})

@app.route('/add_picture', methods=['GET','POST'])
def add_picture():
    memory_id = request.form.get('memoryId')

    # Create a new Picture object in the database
    new_picture = create_picture(picture_data='', memory_id=memory_id)

    # Get the newly created picture ID
    picture_id = new_picture.id

    # Get the image data
    picture_data = request.files.get('imageData')

    # Define the path to save the image
    upload_folder = 'public/savedPictures'  # Replace with your actual path
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Save the image as a PNG or JPEG file
    image_filename = f"memPic_{memory_id}_{picture_id}.png"  # Change the extension accordingly
    image_path = os.path.join(upload_folder, image_filename)
    picture_data.save(image_path)

    # Update the Picture object in the database with the file location
    new_picture.data = image_path
    db.session.commit()

    return jsonify({"Success": new_picture.id, "message": "Picture saved successfully"})
    

@app.route('/get_mem_pics/<memory_id>', methods=['GET'])
def get_mem_pics(memory_id):
    pictures = get_pictures_from_memory_id(memory_id)

    if pictures is None:
        # Memory not found, return a JSON response with a 404 status code
        abort(404)

    # Check if it's a Flask Response object
    if isinstance(pictures, Flask.response_class):
        # Extract the JSON data from the Response object
        pictures_json = json.loads(pictures.get_data(as_text=True))
    else:
        # If it's not a Response object, use it as is
        pictures_json = pictures

    return jsonify(pictures_json)

@app.route('/get_memories', methods=['GET'])
def get_memories():
    memories = get_all_memories()
    
    # Check if it's a Flask Response object
    if isinstance(memories, Flask.response_class):
        # Extract the JSON data from the Response object
        memories_json = json.loads(memories.get_data(as_text=True))
    else:
        # If it's not a Response object, use it as is
        memories_json = memories

    return jsonify(memories_json)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)