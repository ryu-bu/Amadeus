from google.oauth2 import id_token
from google.auth.transport import requests
from config import Config
from .user_handler import UserHandler
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity

class LoginHandler():
    def verify_google(token, push_token):
        #try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            print(token)
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), Config.GOOGLE_CLIENT_ID, clock_skew_in_seconds=60)
            print("CLIENT: ", Config.GOOGLE_CLIENT_ID)

            print(idinfo)

            if idinfo['aud'] != Config.GOOGLE_CLIENT_ID:
                return {"message": "verification failed"}, 200

            # db_response = UserHandler.get_one(idinfo['email'])

            db_response = UserHandler.filter_email(idinfo['email'])

            print(db_response)

            access_token = create_access_token(idinfo['sub'])
            refresh_token = create_refresh_token(identity="example_user")

            if db_response[1] == 404:
                UserHandler.create(idinfo, push_token)

                uuid = str(UserHandler.filter_email(idinfo['email'])[0]['uuid'])

                return {"message": "new user", "access_token": access_token, "refresh_token": refresh_token, "uuid": uuid}, 200
            
            else:
                uuid = str(UserHandler.filter_email(idinfo['email'])[0]['uuid'])

                return {"message": "existing user", "access_token": access_token, "refresh_token": refresh_token, "uuid": uuid}, 200

        #except ValueError:
            # Invalid token
        #    print("error: unverified token")

    def refresh():
        identity = get_jwt_identity()
        print("identity: ", identity)
        access_token = create_access_token(identity)

        return {"access_token": access_token}, 200

    #testing purpose only
    def test_login():
        access_token = create_access_token(identity="example_user")
        refresh_token = create_refresh_token(identity="example_user")
        return {"access_token": access_token, "refresh_token": refresh_token}

