from models.gig_model import Gigs as GigModel
from models.gigPlayer_model import Gigplayers
from models.user_model import Users
from models import db, gigProducer
# from kafka import KafkaTimeoutError
from config import Config

class GigHandler():
    def objdata(self, id, name, description, genre, location):
        return {
            "id": id,
            "name": name,
            "description": description,
            "genre": genre,
            "location": location
        }

    def kafkaData(self, gig_id, host_id, gig_name, host_name, description, genre, location):
        return {
            "gig_id": gig_id,
            "host_id": host_id,
            "gig_name": gig_name,
            "host_name": host_name,
            "description": description,
            "genre": genre, 
            "location": location
        }

    def get_all(self):
        gigs = GigModel.query.all()
        results = [{
            "name": gig.name,
            "hostname": gig.players[0].user.name,
            "description": gig.description,
            "genre": gig.genre,
            "location": gig.location,
        } for gig in gigs]

        # print("users: ", gig.players[0].user)
        # print(gig.players[0].user.email)

        # print("gig: ", users.gig[0].gig.name)

        return results, 200

    def create(self, gig):
        gigmodel = GigModel(gig['name'], gig['description'], gig['genre'], gig['location'])
        
        print("creating a new gig: ", gig)

        kafka_record = self.kafkaData(gigmodel.id, gig['uuid'], gig['name'], gig['user_name'], gig['description'], gig['genre'], gig['location'])

        try:
            gigProducer.send(Config.GIG_TOPIC, key=kafka_record['host_id'], value=kafka_record)
            gigProducer.flush()
        
        except KafkaTimeoutError as kte:
            print("KafkaLogsProducer timeout sending log to Kafka: %s", kte)

        try:
            db.session.add(gigmodel)
            db.session.commit()
        except Exception:
            return {"message": "error creating gig"}, 400

        for member in gig['members']:
            try:
                self.create_player_gig(gigmodel.id, member)
            except Exception:
                return {"message": "error creating gig"}, 400

        res = self.create_player_gig(gigmodel.id, gig['uuid'])
        if res[1] == 400:
            return {"message": "error creating gigPlayer"}, 400

        print("create: ", gigmodel.id)

        return {"message": "success", "gig_id": str(gigmodel.id)}, 201

    def create_player_gig(self, gig_id, user_id):
        gigPlayer_model = Gigplayers(gig_id, user_id)

        print(gig_id, user_id)
        print(gigPlayer_model)

        db.session.add(gigPlayer_model)
        db.session.commit()

        # try:
        #     db.session.add(gigPlayer_model)
        #     db.session.commit()
        # except Exception:
        #     return {"message": "error creating gigPlayer"}, 400

        print("create: ", gigPlayer_model)

        return {"message": "success"}, 201

    def delete_player_gig(self, id):
        try:
            gigPlayer_model = Gigplayers.query.get(id)
            print("deleting gig player id: ", id)

            db.session.delete(gigPlayer_model)
            db.session.commit()
        except:
            print("error deleting gigplayer id: ", id)

    def delete_gig(self, id):
        gig = GigModel.query.get(id)

        # first delete gig player (junction table)
        for gigPlayer in gig.players:
            self.delete_player_gig(gigPlayer.id)

        # finally delete gig table
        try:
            db.session.delete(gig)
            db.session.commit()
            print(f'gig id: {id} deleted')

            return {"message": "delete success"}, 200

        except Exception as e:
            print("error in deleting gig id: ", id)
            print(repr(e))

            return {"message": "delete failed"}, 500


