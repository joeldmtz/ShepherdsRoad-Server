var Registry = require('../../models/registry'),
    Trip = require('../../models/trip');

var _ = require('underscore');

var ObjectId = require('mongoose').Types.ObjectId;

var getSeatsAvailable = function (req, res) {

    var day = new Date();

    day.setYear(req.params.yy);
    day.setMonth(req.params.mm-1);
    day.setDate(req.params.dd);

    Trip.findOne({ trip_id : req.params.id })
    .select('_id depart seats route')
    .exec(function (err, trip){

        if(!err){

            if(trip){
                var t = trip.toJSON();
                var seatsAvailable = [];

                for(var i=0; i < t.seats; i++){
                    seatsAvailable[i]=true;
                }

                Registry.find({ 'tripInfo.trip' : t._id })
                .select('tripInfo')
                .deepPopulate('tripInfo.trip.route')
                .sort('tripInfo.seat')
                .exec(function (err, registries) {

                    if(!err){

                        var r;

                        _.each(registries, function (registry){

                            r=registry.toJSON();

                            var yy=r.tripInfo.day.getYear();
                            var mm=r.tripInfo.day.getMonth();
                            var dd=r.tripInfo.day.getDate();
                            debugger;
                            if(day.getYear() == yy && day.getMonth() == mm && day.getDate() == dd){
                                seatsAvailable[r.tripInfo.seat-1]=false;
                                t.seats--;
                            }

                        });
                    
                        res.status(200).send({

                            seats : t.seats,
                            list : seatsAvailable

                        });

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

module.exports = getSeatsAvailable;