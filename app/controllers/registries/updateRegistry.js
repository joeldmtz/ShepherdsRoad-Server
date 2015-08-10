var Registry = require('../../models/registry');

var updateRegistry = function (req, res){

    Registry.findOne({ serial : req.params.serial })
    .exec(function (err, registry){

        if(!err){

            if(registry){

                //Actualizar aqui

                registry.save(function (err){

                    res.status(200).send({ description : 'OK' });
                    
                });


            } else {
                res.status(404).send();
            }

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = updateRegistry;