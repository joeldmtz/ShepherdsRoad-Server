var Registry = require('../../models/registry');

var _ = require('underscore');

var getRegistries = function (req, res, next){

    Registry.find()
    .select('-_id -__v')
    .populate('user', '-_id -__v')
    .deepPopulate('tripInfo.trip.route')
    .sort('-date')
    .exec(function (err, registries){

        if(!err){

            var r, registriesAsJson;

            registriesAsJson = _.map(registries, function (registry){
                r = registry.toJSON();
                return r;
            });
            
            res.status(200).send(registriesAsJson);

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getRegistries;