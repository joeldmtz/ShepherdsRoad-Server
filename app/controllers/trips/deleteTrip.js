var Trip = require('../../models/trip');

var deleteTrip = function (req, res){

    Trip.findOne({ trip_id : req.params.id })
    .exec(function (err, trip){

        if(!err){

            if(trip){

                trip.active = false;

                trip.save(function (err){

                    if(!err){

                        res.status(200).send({ description : 'OK' });
                    } else {

                        res.status(500).send(err);
                    }

                });

                
            } else {

                res.status(200).send({ description : 'OK' });
            }

            

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = deleteTrip;