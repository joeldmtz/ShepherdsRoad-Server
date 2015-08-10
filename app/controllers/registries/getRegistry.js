var Registry = require('../../models/registry');

var getRegistry = function (req, res){

    Registry.findOne({ serial : req.params.serial })
    .select('-_id -__v')
    .populate('user', '-_id -__v')
    .deepPopulate('tripInfo.trip.route')
    .exec(function (err, registry){

        if(!err){

            if(registry){

                var r = registry.toJSON();

                res.status(200).send(r);

            } else {
                res.status(404).send();
            }

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = getRegistry;