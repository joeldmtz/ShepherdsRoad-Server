var Trip = require('../../models/trip'),
    Route = require('../../models/route');

var addTrip = function (req, res){

    Route.findOne({ route_id : req.body.route.route_id})
    .select("_id")
    .exec(function (err, route){

        if(!err){

            if(route){

                var t = {

                    depart : req.body.depart,
                    route : route._id,
                    price : req.body.price

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