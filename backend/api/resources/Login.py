from flask_restful import Resource
from flask import request
from handlers.login_handler import LoginHandler

class Login(Resource):
    def post(self):
            googleInfo = request.get_json()

            if not googleInfo:
                return {"message": "no body received"}, 204

            idToken = googleInfo['idToken']

            return LoginHandler.verify_google(idToken)