from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from model import connect_to_db
from datetime import datetime
from crud import create_user, create_memory, create_picture, get_user_by_email, get_user_by_username


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