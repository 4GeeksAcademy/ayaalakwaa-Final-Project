"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Code
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from datetime import datetime

import base64

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Authentication
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    encryptedPass = base64.b64encode(password.encode(encoding="utf-8"))

    # verify user name and password
    # user = db.session.query(User).filter(User.email == email, User.password == password).first()
    user = db.session.query(User).filter(User.email == email, User.password == encryptedPass).first()

    token = create_access_token(identity=user.id)

    if (user):
        return jsonify({"user": user.serialize(), "token": token }), 200 
    else:
        return jsonify({ "email": ""}), 204

# Implemennt CRUD for user
@api.route('/signup', methods=['POST'])
def signup():
    password = request.json.get('password')
    encryptedPass = base64.b64encode(password.encode(encoding="utf-8"))

    # user = User(email=request.json.get('email'), password=request.json.get('password'),is_active=True)
    user = User(email=request.json.get('email'), password=encryptedPass, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200 if User else 204

@api.route('/read', methods=['POST'])
def read():
    user = db.session.query(User).filter(User.email == request.json.get('email')).first()

    return jsonify(user.serialize()), 200 if User else 204

@api.route('/recover', methods=['POST'])
def recover():
    user = db.session.query(User).filter(User.email == request.json.get('email')).first()

    return jsonify(user.password), 200 if User else 204

@api.route('/update', methods=['POST'])
@jwt_required()
def update():
    email = request.json.get('email')
    user = db.session.query(User).filter(User.email == email).first()
    # user.password = request.json.get('password')
    password = request.json.get('password')
    user.password = base64.b64encode(password.encode(encoding="utf-8"))

    db.session.commit()

    return jsonify(user.serialize()), 200 if User else 204

@api.route('/delete', methods=['DELETE', 'POST'])
def delete():
    email = request.json.get('email')
    db.session.query(User).filter(User.email == email).delete()
    db.session.commit()

    return jsonify({"message": "user deleted"})

# Implemennt CRUD for code
@api.route('/document/create', methods=['POST'])
@jwt_required()
def createdoc():
    code = Code()
    code.uid = request.json.get('uid')
    code.type = request.json.get('type')
    code.title = request.json.get('title')
    code.content = request.json.get('content')
    code.date_created = datetime.now()
    code.date_modified = datetime.now()
    print(code)
    db.session.add(code)
    db.session.commit()

    return jsonify(code.serialize()), 200 if code else 204

@api.route('/document/read', methods=['GET'])
# @jwt_required()
def readdoc():
    code = db.session.query(Code).filter(Code.id == request.args['id']).first()

    return jsonify(code.serialize()), 200 if code else 204

@api.route('/document/readall', methods=['GET'])
@jwt_required()
def readAll():
    docs = db.session.query(Code).filter(Code.uid == int(request.args['uid'])).all()
    
    return jsonify([_.serialize() for _ in docs]), 200 if docs else 204

@api.route('/document/update', methods=['PUT'])
@jwt_required()
def updatedoc():
    id = request.json.get('id')
    code = db.session.query(Code).filter(Code.id == id).first()
    code.title = request.json.get('title')
    code.type = request.json.get('type')
    code.content = request.json.get('content')
    code.date_modified = datetime.now()
    db.session.commit()

    return jsonify(code.serialize()), 200 if User else 204

@api.route('/document/delete', methods=['GET'])
@jwt_required()
def deletedoc():
    db.session.query(Code).filter(Code.id == request.args['id']).delete()
    db.session.commit()

    return jsonify({"message": "code deleted"})