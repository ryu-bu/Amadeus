from models import db 
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Gigs(db.Model):
    __tablename__ = 'Gigs'
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    genre = db.Column(db.String(120), nullable=True)
    location = db.Column(JSON, nullable=True)
    players = db.relationship('Gigplayers', back_populates='gig', lazy=True) # relation to gigplayer table

    def __init__(self, name, description, genre, location):
        self.name = name
        self.description = description
        self.genre = genre
        self.location = location