from flask_restful import Resource
from flask import request
from handlers.user_handler import UserHandler
from flask_jwt_extended import jwt_required

class Users(Resource):
    @jwt_required()
    def get(self):
        return UserHandler.get_all()

    @jwt_required()
    def post(self):
        newUser = request.get_json()

        if not newUser:
            return {"message": "no body received"}, 204

        return UserHandler.create(newUser)

    # @jwt_required()
    def put(self):
        r = request.get_json()
        print(r)
        id = r["email"]
        key = r["key"]
        val = r["val"]

        return UserHandler.update(id, key, val)


class User(Users):

    # @jwt_required()
    def get(self, id):

        if not id:
            return {"message" : "no id"}, 204

        return UserHandler.get_one(id)

class SearchUsersAdvancedAnd(Resource):
    # @jwt_required()
    def get(self):
        name  = request.args.get('name', None)
        genre  = request.args.get('genre', None)
        instrument  = request.args.get('instrument', None)

        if not name or genre or instrument:
            return {"message" : "no query"}, 204

        name = ".*" if (name == "" or name == None) else name
        genre = ".*" if (genre == "" or genre == None) else genre
        instrument = ".*" if (instrument == "" or instrument == None) else instrument

        print("first thing: ", instrument)
        print("second thing ", genre)
        return UserHandler.advanced_search_and(name, genre, instrument)

class SearchUsersAdvancedOr(Resource):
    # @jwt_required()
    def get(self):
        name  = request.args.get('name', None)
        genre  = request.args.get('genre', None)
        instrument  = request.args.get('instrument', None)

        if not name or genre or instrument:
            return {"message" : "no query"}, 204

        name = ".*" if (name == "" or name == None) else name
        genre = ".*" if (genre == "" or name == None) else genre
        instrument = ".*" if (instrument == "" or instrument == None) else instrument

        return UserHandler.advanced_search_or(name, genre, instrument)


class SearchUsersByName(Resource):

    # @jwt_required()
    def get(self, query):

        if not query:
            return {"message" : "no query"}, 204

        return UserHandler.search_name(query)


class SearchUsersByGenre(Resource):

    # @jwt_required()
    def get(self, query):

        if not query:
            return {"message" : "no query"}, 204

        return UserHandler.search_genre(query)


class SearchUsersByInstrument(Resource):

    # @jwt_required()
    def get(self, query):

        if not query:
            return {"message" : "no query"}, 204

        return UserHandler.search_instrument(query)
