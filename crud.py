from model import db
from datetime import datetime
from flask import jsonify
from model import user, memory, picture
from sqlalchemy import func, or_, and_