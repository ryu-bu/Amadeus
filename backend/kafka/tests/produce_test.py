# from kafka import KafkaConsumer, KafkaProducer
from kafka import KafkaProducer
import json

TOPIC_NAME = "test"
# TOPIC_NAME = "subscription"

KAFKA_SERVER = "localhost:9092"

producer = KafkaProducer(
    bootstrap_servers = KAFKA_SERVER,
    api_version = (0, 11, 15),
    key_serializer = str.encode,
    value_serializer = lambda v: json.dumps(v).encode('utf-8')
)

def send_to_kafka(k, v):
    producer.send(TOPIC_NAME, key=k, value=v)
    producer.flush()

# test sending
test_list = [
    ("dev", "james"),
    ("brandon", "sam")
]

test_json = {
    "location": "BU",
    "description": "lets have fun!",
    "hostname": "ryuichi"
}

# for record in test_list:
#     k, v = record
#     send_to_kafka(k, v)

# fly subscribes to ryuichi
# key: ryuichi uuid, value: fly uuid
# send_to_kafka("54ea5419-a078-42d3-8e94-10fb5f0bce02", {
#     "subs": [
#         "test1",
#         "test2",
#         "test3",
#         # "test4"
#     ]
# })
send_to_kafka("54ea5419-a078-42d3-8e94-10fb5f0bce02", {
    "test": "test sending",
    "location": "BU"
})