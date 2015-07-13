var Route = require('../../models/route');

var _ = require('underscore');

var getRoutes = function (req, res, next){

    Route.find()
    .sort("route_id")
    .exec(function (err, routes){

        if(!err){

            var r;

            var routesAsJson = _.map(routes, function (route){

                r = route.toJSON();

                return r;

            });

            req.z = routesAsJson;
            next();

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getRoutes;