from operator import and_, or_
from models.user_model import Users as UserModel
from models import db
import json

from handlers.gig_handler import GigHandler

# maximum amount of users that can be returned form  a single query
MAX_RETURNED_USERS = 50;

class UserHandler():
    def get_all():
        users = UserModel.query.all()
        results = [{
            "uuid": str(user.id),
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "location": user.location,
            "instrument": user.instrument,
            "picture": user.pic
        } for user in users]

        return results, 200

    def filter_email(email):
        user = UserModel.query.filter_by(email=email).first()

        print(user)

        if not user:
            return {"message" : "no match"}, 404

        return {
            "name": user.name,
            "email": user.email,
            "uuid": user.id
        }, 200

    def get_one(id):
        user = UserModel.query.get(id)

        if not user:
            return {"message" : "no match"}, 404

        gigs = []

        for item in user.gig:
            gig = item.gig
            gigs.append(GigHandler().objdata(str(gig.id), gig.name, gig.description, gig.genre, gig.location))

        return {
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location,
            "push_token": user.pushtoken,
            "gigs": gigs
        }, 200

    def create(user, push_token):

        print("called")
        usermodel = UserModel(user['name'], user['email'], user['picture'], push_token)

        try:
            db.session.add(usermodel)
            db.session.commit()
        except Exception:
            return {"message": "email already exists"}, 200

        print("create: ", user)

        return {"message": "success"}, 201

    def update(id, key, val):
        try:
            db.session.query(UserModel).filter(UserModel.email == id).update({key: val})
            db.session.commit()
            return {"message": "update success"}, 200

        except Exception:
            return {"message": "update failed"}, 500
    
    # perform advanced search for users matching all of the parameters
    def advanced_search_and(name= '.*', genre = '.*', instrument = '.*'):
        users = db.session.query(UserModel).filter(
            (UserModel.name.regexp_match('{}'.format(name), 'i')) &
            (UserModel.genre.regexp_match('{}'.format(genre), 'i')) &
            (UserModel.instrument.regexp_match('{}'.format(instrument), 'i'))
        ).limit(MAX_RETURNED_USERS).all()
      
        print(users)

        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for user in users]

        return results, 200

    # perform advanced search for users matching at least one of the  parameters 
    def advanced_search_or(name = '.*', genre = '.*', instrument = '.*'):
        users = db.session.query(UserModel).filter(
            (UserModel.name.regexp_match('{}'.format(name), 'i')) |
            (UserModel.genre.regexp_match('{}'.format(genre), 'i')) |
            (UserModel.instrument.regexp_match('{}'.format(instrument), 'i'))
        ).limit(MAX_RETURNED_USERS).all()
      
        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for user in users]

        return results, 200

    def search_name(query):
        users = db.session.query(UserModel).filter(UserModel.name.regexp_match('{}'.format(query), 'i')).limit(MAX_RETURNED_USERS).all()
      
        print(users)

        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for user in users]

        return results, 200

    def search_genre(query):
        users = db.session.query(UserModel).filter(UserModel.genre.regexp_match('{}'.format(query), 'i')).limit(MAX_RETURNED_USERS).all()
    
        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for user in users]
        
        return results, 200

    def search_instrument(query):
        users = db.session.query(UserModel).filter(UserModel.instrument.regexp_match('{}'.format(query), 'i')).limit(MAX_RETURNED_USERS).all()
    
        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for user in users]
        
        return results, 200