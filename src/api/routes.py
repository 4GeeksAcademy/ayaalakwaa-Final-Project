import os
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Code
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_json(force=True)

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)

    user = User(email=request_body["email"], password=request_body["password"],is_active=True)

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Credenciales incorrectas"), 401

    access_token = create_access_token(identity=user.id)
    print(access_token)

    response_body = {
        "msg": "logged",
        "user": user.serialize(),
        "token": access_token
    }
    print(response_body),
    return jsonify(response_body), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }

    return jsonify(success=True, response=response_body), 200

@api.route('/update', methods=['PUT'])
@jwt_required()
def update():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(id=get_jwt_identity()).first()
    user.email = email 
    # conditionals
    user.password = password
    
    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "successfully updated account info",
        "user": user.serialize(),
    }
    return jsonify(response_body), 200

@api.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_account():
    # Get the current user
    current_user_id = get_jwt_identity() 
    print (current_user_id)
    user = User.query.filter_by(id=current_user_id).first()

    # Check if user exists
    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    # Delete the user
    try:
        db.session.delete(user)
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    return jsonify(success=True, message='User deleted successfully'), 200

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