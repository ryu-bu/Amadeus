from models import db 

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.String(20), nullable=False)

    def __init__(self, name, email, dob):
        self.name = name
        self.email = email
        self.dob = dob