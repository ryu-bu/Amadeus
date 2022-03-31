from models import db 
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pic = db.Column(db.String(200), nullable=True)
    genre = db.Column(db.String(120), nullable=True)
    location = db.Column(JSON, nullable=True)
    instrument = db.Column(db.String(500), nullable=True)
    dob = db.Column(db.String(200), nullable=True)
    gig = db.relationship('Gigplayers', back_populates='user', lazy=True) # relation to Gigplayer table
    # following = db.relationship('Subscription', back_populates='user', lazy=True)
    follower = db.relationship('Subscription', back_populates='musician', lazy=True)

    def __init__(self, name, email, pic):
        self.name = name
        self.email = email
        self.pic = pic