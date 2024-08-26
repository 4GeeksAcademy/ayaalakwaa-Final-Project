from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

import time

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Code(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer)
    title = db.Column(db.String(32))
    type = db.Column(db.String(32))
    content = db.Column(db.String(5096), nullable=False)
    date_created = db.Column(db.DateTime)
    date_modified = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Code {id} {self.uid} {self.title} {self.type} {self.content} {self.date_modified} {self.date_modified}>'

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "title": self.title,
            "type": self.type,
            "content": self.content,
            "date_created": self.date_created,
            "date_modified": self.date_modified
        }