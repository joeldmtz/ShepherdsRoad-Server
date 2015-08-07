var Route = require('../../models/route');

var _ = require('underscore');

var getPlaces = function (req, res) {
    
    Route.find()
    .select('stopovers from toCity')
    .exec(function (err, routes){

        if(!err){

            var r, list;

            var places = _.map(routes, function (route){

                r = route.toJSON();

                list = (r.stopovers.hasIt)?r.stopovers.places:[];

                list.push(r.from);
                list.push(r.toCity);

                return list;

            })
            
            list = _.flatten(places);
            list = _.compact(list);
            list = _.uniq(list);
            
            res.status(200).send(list.sort());



        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getPlaces;