var Route = require('../../models/route');

var updateRoute = function (req, res){

    Route.findOne({ route_id : req.params.id })
    .exec(function (err, route){

        if(!err){

            if(route){

                route.active = true;

                route.save(function (err){

                    if(!err){

                        res.status(200).send({ description : 'OK' });
                    } else {

                        res.status(500).send(err);
                    }

                });

                
            } else {

                res.status(200).send({ description : 'OK' });
            }

            

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = updateRoute;