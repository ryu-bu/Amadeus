from flask_restful import Resource
from flask import request, jsonify
from models.user_model import Users as UserModel
from models import db
from handlers.sql_handler import SqlHandler

class Users(Resource):
    user_list = {}

#   {
#     "1234":{
#     "name": "post2",
#     "id": "1234",
#     "email": "adfsvas@buff.rotc",
#     "dob": "1/2/3"
#     }
# }

    def get(self):
        # users = UserModel.query.all()
        # results = [{
        #     "name": user.name,
        #     "id": user.id,
        #     "email": user.email,
        #     "dob": user.dob
        # } for user in users]

        return SqlHandler.get_all()

    def post(self):
        newUser = request.get_json()

        if not newUser:
            return {"message": "no body received"}, 204

        # self.user_list[newUser['id']] = {
        #     "name": newUser['name'],
        #     "id": newUser['id'],
        #     "email": newUser['email'],
        #     "dob": newUser['dob']
        # }

        # usermodel = UserModel(newUser['name'], newUser['email'], newUser['dob'])

        # try:
        #     db.session.add(usermodel)
        #     db.session.commit()
        # except Exception:
        #     return {"message": "email already exists"}, 200

        # print(self.user_list)

        return SqlHandler.create(newUser)


class User(Users):

    def get(self, id):

        if not id:
            return {"message" : "no id"}, 204

        return SqlHandler.get_one(id)
