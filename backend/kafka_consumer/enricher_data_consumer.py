from kafka import KafkaConsumer
import json
import os 
from dotenv import load_dotenv

load_dotenv()

enrichedConsumer = KafkaConsumer(
    os.environ.get("ENRICHED_TOPIC"),
    bootstrap_servers = os.environ.get("KAFKA_SERVER"),
    auto_offset_reset='earliest',
    key_deserializer = lambda v: json.loads(v),
    value_deserializer = lambda v: json.loads(v)
)

for item in enrichedConsumer:
    print("key is: ", item.key)
    print("val is: ", item.value)