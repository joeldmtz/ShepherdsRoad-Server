var Route = require('../../models/route');

var addRoute = function (req, res){

    req.body.stopovers = { hasIt: true, places: ["Tepic"]};

    var r = {
        from : req.body.from,
        toCity : req.body.toCity,
        stopovers : {
            hasIt : req.body.stopovers.hasIt || true,
        }
    }

    if(r.stopovers.hasIt){
        r.stopovers.places = req.body.stopovers.places;
    }

    var route = new Route(r);

    route.save(function (err){

        if(!err){

            route.nextCount(function (err){
                if(!err){
                    res.status(200).send({ description : 'OK' });
                } else {
                    res.status(500).send(err);
                }
            });

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = addRoute;