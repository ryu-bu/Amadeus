from flask_restful import Resource
from flask import request
from handlers.user_handler import UserHandler

class Users(Resource):
    def get(self):
        return UserHandler.get_all()

    def post(self):
        newUser = request.get_json()

        if not newUser:
            return {"message": "no body received"}, 204

        return UserHandler.create(newUser)

    def put(self):
        r = request.get_json()
        print(r)
        id = r["email"]
        key = r["key"]
        val = r["val"]

        return UserHandler.update(id, key, val)


class User(Users):

    def get(self, id):

        if not id:
            return {"message" : "no id"}, 204

        return UserHandler.get_one(id)
