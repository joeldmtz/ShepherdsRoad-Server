var Route = require('../../models/route');

var _ = require('underscore');

var getRoutes = function (req, res){

    var query={};

    if(req.params.user != 'admin'){
        query = { active : true };
    }

    Route.find(query)
    .sort('route_id')
    .select('-_id -__v')
    .exec(function (err, routes){

        if(!err){

            var r;

            var routesAsJson = _.map(routes, function (route){

                r = route.toJSON();

                return r;

            });

            res.status(200).send(routesAsJson);

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getRoutes;