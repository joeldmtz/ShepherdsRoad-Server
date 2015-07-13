var Trip = require('../../models/trip'),
    Route = require('../../models/route');

var addTrip = function (req, res){

    req.body.route = { route_id: 1 };
    req.body.depart = Date.now();

    Route.findOne({ route_id : req.body.route.route_id})
    .select("_id")
    .exec(function (err, route){

        if(!err){

            if(route){

                var t = {

                    depart : req.body.depart,
                    route : route._id,

                }

                var trip = new Trip(t);

                trip.save(function (err){

                    if(!err){

                        trip.nextCount(function (err){

                            if(!err){
                                res.status(200).send({ description : 'OK'});

                            } else {
                                res.status(500).send(err);
                            }

                        });

                    } else {


                    }

                });


            } else {

                res.status(404);

            }


        } else {

            res.status(500).send(err);

        }

    });

    

};

module.exports = addTrip;