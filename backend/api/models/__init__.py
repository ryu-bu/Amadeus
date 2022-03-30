from flask_sqlalchemy import SQLAlchemy
from kafka import KafkaConsumer, KafkaProducer
import json
from config import Config

db = SQLAlchemy()

gigProducer = KafkaProducer(
    bootstrap_servers = Config.KAFKA_SERVER,
    api_version = (0, 11, 15),
    key_serializer = str.encode,
    value_serializer = lambda v: json.dumps(v).encode('utf-8')
)