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

        var total=0, totalTrips=[], rr, time, name;

        var r = { day : date };

        r.registries = _.chain(registries)
            .filter(function (registry) {
                
                rr = registry.toJSON();
                return rr.day > date;
            })
            .map(registries, function (registry){
                
                rr = registry.toJSON();

                total += rr.price;

                time = rr.day.toTimeString().split(' ')[0];
                name = rr.tripInfo.trip.route.from + ' - ' + rr.tripInfo.trip.route.toCity + ' ' + time;

                totalTrips[rr.tripInfo.trip.trip_id-1] = totalTrips[rr.tripInfo.trip.trip_id-1] || { trip : name, total : 0 };
                totalTrips[rr.tripInfo.trip.trip_id-1].total++;

                return {
                    trip : name,
                    day : rr.tripInfo.day,
                    seat : rr.tripInfo.seat,
                    user : rr.client.firstName + ' ' + rr.client.lastName,
                    price : rr.price,
                };


            });

        r.day.setHours(23);
        r.day.setMinutes(59);
        r.day.setSeconds(59);

        r.total = total;
        r.totalTrips = totalTrips;

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