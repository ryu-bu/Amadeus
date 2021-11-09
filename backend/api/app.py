from flask import Flask, Blueprint
from flask_restful import Api
from resources.Users import Users, User
from config import Config
from models import db
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    current_version = 'v1'

    api.add_resource(Users, '/users/')
    api.add_resource(User, '/user/<string:id>')

    app.register_blueprint(api_bp, url_prefix='/api/{}'.format(current_version))

    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    return app

app = create_app()

migrate = Migrate(app, db)

if __name__ == '__main__':
    create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=8080)


