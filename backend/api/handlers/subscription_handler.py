from config import Config
from models.subscription_model import Subscription as SubModel
from models.user_model import Users as UserModel
from models import db#, subProducer
import json

class SubscriptionHandler():
    # def kafka_producer(self, key, value):
    #     try:
    #         subProducer.send(Config.SUB_TOPIC, key=key, value=value)
    #         subProducer.flush()

    #     except KafkaTimeoutError as kte:
    #         print("KafkaLogsProducer timeout sending log to Kafka: %s", kte)
            
    def create(self, sub):
        musician = sub["musician"]
        user = sub["user"]

        followers = self.find_followers(musician)["followers"]

        if user not in followers:

            submodel = SubModel(musician, user)

            print("create a new subscription: ", sub)

            try:
                db.session.add(submodel)
                db.session.commit()
            except Exception:
                return {"message": "error creating a new sub"}, 400

            followers.append(user)

            # self.kafka_producer(musician, {
            #     "followers": followers
            #     })

            print("followers now: ", {
                "followers": followers
            })

            return {"message": "success", "sub_id": str(submodel.id)}, 201

        else:
            # print("followers now: ", self.find_followers(musician))

            return {"message": "follower already exists"}, 201

    def find_followers(self, id):
        # id = "70c0a29e-a152-44ce-a61e-f8b68e58f738"
        sub = UserModel.query.get(id)
  
        # print(sub.follower[0].user_id)

        if not sub:
            return {}

        followers = []
        for item in sub.follower:
            follower = item.user_id
            followers.append(str(follower))

        return {"followers": followers}

    def delete(self, sub):
        user = sub["user"]
        musician = sub["musician"]

        submodel = SubModel.query.filter_by(user=user, musician=musician).first()

        id = submodel.id

        try:
            db.session.delete(submodel)
            db.session.commit()
            print(f'sub id: {id} deleted')

            return {"message": "delete success"}, 200
        
        except Exception as e:
            print("error in deleting sub id: ", id)
            print(repr(e))

            return {"message": "delete failed"}, 500
