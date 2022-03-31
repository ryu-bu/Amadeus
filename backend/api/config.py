from dotenv import load_dotenv
import os

load_dotenv()  

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    GOOGLE_CLIENT_ID = os.environ.get("CLIENT_ID")
    JWT_SECRET = os.environ.get("JWT_SECRET")
    KAFKA_SERVER = os.environ.get("KAFKA_SERVER")
    GIG_TOPIC = os.environ.get("GIG_TOPIC")
    SUB_TOPIC = os.environ.get("SUB_TOPIC")
    ENRICHED_TOPIC = os.environ.get("ENRICHED_TOPIC")
