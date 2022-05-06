from kafka import KafkaConsumer
import json
import os 
from dotenv import load_dotenv

from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from requests.exceptions import ConnectionError, HTTPError

load_dotenv()

enrichedConsumer = KafkaConsumer(
    os.environ.get("ENRICHED_TOPIC"),
    bootstrap_servers = os.environ.get("KAFKA_SERVER"),
    # auto_offset_reset='earliest',
    key_deserializer = lambda v: json.loads(v),
    value_deserializer = lambda v: json.loads(v)
)



# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, title, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        title=title,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        # Encountered some likely formatting/validation error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'errors': exc.errors,
                'response_data': exc.response_data,
            })
        raise
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        rollbar.report_exc_info(
            extra_data={'token': token, 'message': message, 'extra': extra})
        raise self.retry(exc=exc)

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushTicketError as exc:
        # Encountered some other per-notification error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
        raise self.retry(exc=exc)


for item in enrichedConsumer:
    for token in item.key["followers"]:
        print(token)
        title = item.value["host_name"] + " just updated a new gig: " + item.value["gig_name"] + "!"
        message = f'Gig Name: {item.value["gig_name"]}\nLocation: {item.value["location"]["name"]}\nDescription: {item.value["description"]}'
        send_push_message(token, title, message)
    print("key is: ", item.key)
    print("val is: ", message)

# send_push_message("ExponentPushToken[WSv6IPPCGJ5Aq8Fo85URJp]", "body")