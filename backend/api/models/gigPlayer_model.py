from models import db 
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Gigplayers(db.Model):
    __tablename__ = 'Gigplayers'
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, primary_key=True)
    gig_id = db.Column(UUID(as_uuid=True), db.ForeignKey('Gigs.id'))
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('Users.id'))
    user = db.relationship('Users', back_populates='gig')
    gig = db.relationship('Gigs', back_populates='players')


    def __init__(self, gig_id, user_id):
        self.gig_id = gig_id
        self.user_id = user_id