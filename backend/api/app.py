from flask import Flask, Blueprint
from flask_restful import Api
from resources.Users import Users, User
from resources.Login import Login, LoginTest, RefreshToken
from config import Config
from models import db
from flask_migrate import Migrate
from datetime import timedelta

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    current_version = 'v1'

    api.add_resource(Users, '/users/')
    api.add_resource(User, '/user/<string:id>')
    api.add_resource(Login, '/login')
    api.add_resource(RefreshToken, '/refresh')
    
    # for testing
    api.add_resource(LoginTest, '/dev/login')

    app.register_blueprint(api_bp, url_prefix='/api/{}'.format(current_version))

    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    db.init_app(app)

    jwt = JWTManager(app)

    return app

app = create_app()

migrate = Migrate(app, db)

if __name__ == '__main__':
    # create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=8080)


