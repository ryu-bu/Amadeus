from models.user_model import Users as UserModel
from models import db

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

        return {
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        }, 200

    def create(user):

        print("called")
        usermodel = UserModel(user['name'], user['email'], user['picture'])

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

    def search_name(query):
        user = db.session.query(UserModel).filter(UserModel.name.op('regexp')(r'{}'.format(query))).all()
      
        print(user)

        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for users in user]

        return results, 200

    def search_genre(query):
        user = db.session.query(UserModel).filter(UserModel.genre.op('regexp')(r'{}'.format(query))).all()
    
        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for users in user]
        
        return results, 200

    def search_instrument(query):
        user = db.session.query(UserModel).filter(UserModel.instrument.op('regexp')(r'{}'.format(query))).all()
    
        results = [{
            "name": user.name,
            "email": user.email,
            "dob": user.dob,
            "genre": user.genre,
            "instrument": user.instrument,
            "picture": user.pic,
            "location": user.location
        } for users in user]
        
        return results, 200