var Trip = require('../../models/trip')
    Route = require('../../models/route');

var updateTrip = function (req, res){

    Trip.findOne({ trip_id : req.params.id })
    .exec(function (err, trip){

        if(!err){

            if(trip){

                Route.findOne({ route_id : req.body.route.route_id })
                .select('_id')
                .exec(function (err, route){

                    if(!err){

                        if(route){

                            trip.depart = req.bosy.depart;
                            trip.route = route._id;
                            trip.seats = req.body.seats;
                            trip.price = req.body.price;

                            trip.active = true;

                            trip.save(function (err){

                                if(!err){

                                    res.status(200).send({ description : 'OK' });
                                } else {

                                    res.status(500).send(err);
                                }

                            });

                        } else {

                            res.status(404).send();
                        }

                    } else {

                        res.status(500).send(err);

                    }
                    
                });

            } else {

                res.status(404).send();
            }

            

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = updateTrip;