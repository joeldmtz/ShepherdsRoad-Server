var Registry = require('../../models/registry'),
    Trip = require('../../models/trip'),
    User = require('../../models/user');

var prices = require('../../../prices');

var addRegistry = function (req, res) {

    var serial = Date.now().toString() + '-' + req.body.client.lastName[0] + req.body.client.firstName[0];

    var add = function(regis){

        regis.save(function (err){

            if(!err){

                regis.nextCount(function (err){

                    if(!err){
                        res.status(200).send({ description : 'OK'});

                    } else {
                        res.status(500).send(err);
                    }

                });
            } else{
                res.status(500).send(err);
            }

        });

    };

    var findTrip = function (user){

        return function (err, trip){

            if(!err){

                if(trip){

                    var registry = new Registry({

                        user : user._id,
                        day : req.body.day,
                        client : req.body.client,
                        serial : serial,
                        tripInfo : {
                            trip : trip._id,
                            from : req.body.tripInfo.from,
                            toCity : req.body.tripInfo.toCity,
                            day : req.body.tripInfo.day,
                            seat : req.body.tripInfo.seat
                        },
                        price : (trip.route.stopovers.hasIt)?prices.base:prices.base*prices.extra

                    });

                    add(registry);

                    
                } else {
                    res.status(404);
                }

            } else{
                res.status(500).send(err);
            }

        }

    };

    var findUser = function (err, user){

        if(!err){

            if(user){

                Trip.findOne({ trip_id : req.body.tripInfo.trip.trip_id })
                .select('_id route')
                .populate('route', 'stopovers')
                .exec(findTrip(user));

            } else {
                res.status(404);
            }

        } else {
            res.status(500).send(err);
        }

    };

    User.findOne({ user_id : req.body.user.user_id })
    .select("_id")
    .exec(findUser);

};

module.exports = addRegistry;