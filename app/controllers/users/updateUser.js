var User = require('../../models/user');

var updateUser = function (req, res){

    User.findOne({ user_id : req.params.id })
    .exec(function (err, user){

        if(!err){

            if(user){

                user.active = true;

                user.save(function (err){

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

module.exports = updateUser;