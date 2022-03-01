from models.gig_model import Gigs as GigModel
from models.gigPlayer_model import Gigplayers
from models.user_model import Users
from models import db

class GigHandler():
    def get_all(self):
        gigs = GigModel.query.all()
        results = [{
            "name": gig.name,
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