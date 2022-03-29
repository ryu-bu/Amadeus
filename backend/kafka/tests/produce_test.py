# from kafka import KafkaConsumer, KafkaProducer
from kafka import KafkaProducer
TOPIC_NAME = "test"

KAFKA_SERVER = "localhost:9092"

producer = KafkaProducer(
    bootstrap_servers = KAFKA_SERVER,
    api_version = (0, 11, 15),
    key_serializer = str.encode,
    value_serializer = str.encode
)

def send_to_kafka(k, v):
    producer.send(TOPIC_NAME, key=k, value=v)
    producer.flush()

# test sending
test_list = [
    ("dev", "james"),
    ("brandon", "sam")
]

for record in test_list:
    k, v = record
    send_to_kafka(k, v)