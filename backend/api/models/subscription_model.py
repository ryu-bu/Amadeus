from models import db 
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Subscription(db.Model):
    __tablename__ = 'Subscription'
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, primary_key=True)
    musician_id = db.Column(UUID(as_uuid=True), db.ForeignKey('Users.id'))
    user_id = db.Column(UUID(as_uuid=True))
    # user = db.relationship('Users', back_populates='following', lazy=True)
    musician = db.relationship('Users', back_populates='follower', lazy=True)

    def __init__(self, musician_id, user_id):
        self.musician_id = musician_id
        self.user_id = user_id
