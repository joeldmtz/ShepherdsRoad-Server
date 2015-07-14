var Registry = require('../../models/registry'),
    Trip = require('../../models/trip'),
    User = require('../../models/user');

var prices = require('../../../prices');

var addRegistry = function (req, res) {

    req.body.trip = { trip_id : 1 };
    req.body.user = { user_id : 1 };
    req.body.client = { firstName: 'Joel', lastName : 'De la O'};

    var serial = Date.now().toString() + '-' + req.body.client.lastName[0] + req.body.client.firstName[0];
    var day = Date.now();

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
                        client : req.body.client,
                        serial : serial,
                        tripInfo : {
                            trip : trip._id,
                            day : day,
                            seat : req.body.seat
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

                Trip.findOne({ trip_id : req.body.trip.trip_id })
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