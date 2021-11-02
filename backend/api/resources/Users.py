from flask_restful import Resource
from flask import request, jsonify


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
        return self.user_list, 200

    def post(self):
        newUser = request.get_json()

        print(newUser)

        if not newUser:
            return {"message": "no body received"}, 204

        self.user_list[newUser['id']] = {
            "name": newUser['name'],
            "id": newUser['id'],
            "email": newUser['email'],
            "dob": newUser['dob']
        }

        print(self.user_list)

        return {"message": "success"}, 201


class User(Users):

    def get(self, id):
        if not id:
            return {"message" : "no id"}, 204

        if id not in self.user_list:
            return {"message" : "no match"}, 200

        print(self.user_list)

        return self.user_list[id]
