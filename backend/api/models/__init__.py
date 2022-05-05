from flask_sqlalchemy import SQLAlchemy
#rom kafka import KafkaConsumer, KafkaProducer
import json
from config import Config

db = SQLAlchemy()

# gigProducer = KafkaProducer(
#     bootstrap_servers = Config.KAFKA_SERVER,
#     api_version = (0, 11, 15),
#     key_serializer = str.encode,
#     value_serializer = lambda v: json.dumps(v).encode('utf-8')
# )

# subProducer = KafkaProducer(
#     bootstrap_servers = Config.KAFKA_SERVER,
#     key_serializer = str.encode,
#     value_serializer = lambda v: json.dumps(v).encode('utf-8')
# )

# enrichedConsumer = KafkaConsumer(
#     Config.ENRICHED_TOPIC,
#     bootstrap_servers = Config.KAFKA_SERVER,
#     key_deserializer = lambda v: json.dumps(v).encode('utf-8'),
#     value_deserializer = lambda v: json.dumps(v).encode('utf-8')
# )