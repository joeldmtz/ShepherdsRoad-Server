var Report = require('../../models/report'),
    Registry = require('../../models/registry');

var _ = require('underscore');

var addReport = function (req, res){

    var date = new Date();

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    Registry.find()
    .select()
    .select('-_id -__v')
    .populate('user', '-_id -__v')
    .deepPopulate('tripInfo.trip.route')
    .sort('day')
    .exec(function (err, registries){

        var total=0, trips=[], rr, time, name, totalTrips=0;

        var r = { day : date };

        r.registries = _.chain(registries)
            .filter(function (registry) {
                
                rr = registry.toJSON();
                return rr.day > date;
            })
            .map(function (registry){
                
                rr = registry.toJSON();

                total += rr.price;

                name = rr.tripInfo.trip.route.from + ' - ' + rr.tripInfo.trip.route.toCity;

                trips[rr.tripInfo.trip.trip_id-1] = trips[rr.tripInfo.trip.trip_id-1] || rr.tripInfo.trip;
                trips[rr.tripInfo.trip.trip_id-1].total = trips[rr.tripInfo.trip.trip_id-1].total || 0;

                trips[rr.tripInfo.trip.trip_id-1].total++;

                totalTrips++;
                return rr;


            })
            .value();

        r.day.setHours(23);
        r.day.setMinutes(59);
        r.day.setSeconds(59);

        r.total = total;
        r.totalTrips = totalTrips;
        r.trips = trips;

        r.registries = _.compact(r.registries);
        r.trips = _.compact(r.trips);

        var report = new Report(r);

        report.save(function (err){

            if(!err){

                report.nextCount(function (err){

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

    });

};

module.exports = addReport;