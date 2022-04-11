from flask_restful import Resource
from flask import request
from handlers.login_handler import LoginHandler
from flask_jwt_extended import jwt_required

class Login(Resource):
    def post(self):
            googleInfo = request.get_json()

            if not googleInfo:
                return {"message": "no body received"}, 204

            idToken = googleInfo['result']['idToken']
            
            # if push token does not exist (when using simulator, for example), do not set it yet
            pushToken = ""
            if 'push_token' in googleInfo:
                pushToken = googleInfo['push_token']

            return LoginHandler.verify_google(idToken, pushToken)

# refresh access token
class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self):
        return LoginHandler.refresh()


# for testing purpose only
class LoginTest(Resource):
    def post(self):
        return LoginHandler.test_login()