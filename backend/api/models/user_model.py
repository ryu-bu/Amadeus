from models import db 

class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, primary_key=True)
    pic = db.Column(db.String(200), nullable=True)
    genre = db.Column(db.String(120), nullable=True)
    location = db.Column(db.String(500), nullable=True)
    instrument = db.Column(db.String(500), nullable=True)
    dob = db.Column(db.String(20), nullable=True)

    def __init__(self, name, email, pic):
        self.name = name
        self.email = email
        self.pic = pic