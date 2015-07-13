var Registry = require('../models/registry');

var addRegistry = function (req, res) {
    
    registry = new Registry(req.body);

    registry.save(function (err){

        if(!err){

            registry.nextCount(function (err){

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

};

module.exports = addRegistry;