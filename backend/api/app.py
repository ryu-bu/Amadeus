from flask import Flask, Blueprint
from flask_restful import Api
from resources.Users import Users, User


app = Flask(__name__)
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

current_version = 'v1'

api.add_resource(Users, '/users/')
api.add_resource(User, '/user/<string:id>')

app.register_blueprint(api_bp, url_prefix='/api/{}'.format(current_version))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)


