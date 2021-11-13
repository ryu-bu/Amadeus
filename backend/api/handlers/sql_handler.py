from models.user_model import Users as UserModel
from models import db

class SqlHandler():
    def get_all():
        users = UserModel.query.all()
        results = [{
            "name": user.name,
            "id": user.id,
            "email": user.email,
            "dob": user.dob
        } for user in users]

        return results, 200


    def get_one(id):
        user = UserModel.query.get(id)

        print(user)

        if not user:
            return {"message" : "no match"}, 200

        return {
            "name": user.name,
            "id": user.id,
            "email": user.email,
            "dob": user.dob
        }, 200

    def create(user):
        usermodel = UserModel(user['name'], user['email'], user['dob'])

        try:
            db.session.add(usermodel)
            db.session.commit()
        except Exception:
            return {"message": "email already exists"}, 200

        print("create: ", user)

        return {"message": "success"}, 201

    
