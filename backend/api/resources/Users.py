from flask_restful import Resource
from flask import request
from handlers.sql_handler import SqlHandler

class Users(Resource):
#   {
#     "1234":{
#     "name": "post2",
#     "id": "1234",
#     "email": "adfsvas@buff.rotc",
#     "dob": "1/2/3"
#     }
# }

    def get(self):
        return SqlHandler.get_all()

    def post(self):
        newUser = request.get_json()

        if not newUser:
            return {"message": "no body received"}, 204

        return SqlHandler.create(newUser)


class User(Users):

    def get(self, id):

        if not id:
            return {"message" : "no id"}, 204

        return SqlHandler.get_one(id)
