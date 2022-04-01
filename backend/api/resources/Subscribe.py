from pydoc import resolve
from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from handlers.subscription_handler import SubscriptionHandler

class Subscribe(Resource):
    # def get(self):

    #     return SubscriptionHandler().find_followers("f29698f1-8624-4739-9073-37149475435a")
    def post(self):
        subscription = request.get_json()
        
        if not subscription:
            return {"message": "no body received"}, 204

        return SubscriptionHandler().create(subscription)

    def delete(self):
        subscription = request.get_json()
        
        if not subscription:
            return {"message": "no body received"}, 204

        return SubscriptionHandler().delete(subscription)