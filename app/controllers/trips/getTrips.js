var Trip = require('../../models/trip');

var _ = require('underscore');

var getTrips = function (req, res){

    var query={};

    if(req.params.user != 'admin'){
        query = { active : true };
    }

    Trip.find(query)
    .select('-_id -__v')
    .sort('trip_id')
    .populate('route', '-_id -__v')
    .exec(function (err, trips){

        if(!err){

            var t;

            var tripsAsJson = _.map(trips, function (trip){

                t = trip.toJSON();

                return t;

            });

            res.status(200).send(tripsAsJson);

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getTrips;