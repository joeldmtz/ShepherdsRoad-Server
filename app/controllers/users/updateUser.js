var User = require('../../models/user');

var updateUser = function (req, res){

    User.findOne({ user_id : req.params.id })
    .exec(function (err, user){

        if(!err){

            if(user){

                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.user = req.body.user;
                user.password = req.body.password || user.password;
                user.active = true;

                user.save(function (err){

                    if(!err){
                        res.status(200).send({ description : 'OK' });
                    } else {

                        res.status(500).send(err);
                    }

                });

                
            } else {

                res.status(404).send();
            }

            

        } else {

            res.status(500).send(err);

        }

    });

};

module.exports = updateUser;