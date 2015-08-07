var Trip = require('../../models/trip');

var _ = require('underscore');

var getTripsByDate = function (req, res){

    var day = new Date(), today = new Date();

    day.setYear(req.params.yy);
    day.setMonth(req.params.mm-1);
    day.setDate(req.params.dd);

    Trip.find()
    .select('-_id -__v')
    .sort('depart')
    .populate('route', '-_id -__v')
    .exec(function (err, trips){

        if(!err){

            var t;

            var tripsAsJson = _.chain(trips)
                .filter(function (trip) {
                    
                    t = trip.toJSON();

                    t.depart.setYear(day.getYear()+1900);
                    t.depart.setMonth(day.getMonth());
                    t.depart.setDate(day.getDate());
                    
                    return t.depart >= today;

                })
                .map(function (trip){

                    t = trip.toJSON();

                    return t;

                });

            res.status(200).send(tripsAsJson);

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getTripsByDate;