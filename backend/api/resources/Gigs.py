from flask_restful import Resource
from flask import request
from handlers.gig_handler import GigHandler
from flask_jwt_extended import jwt_required

class Gigs(Resource):
    def get(self):
        return GigHandler().get_all()

    def post(self):
        newGig = request.get_json()

        if not newGig:
            return {"message": "no body received"}, 204

        return GigHandler().create(newGig)