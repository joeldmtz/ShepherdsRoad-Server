var User = require('../../models/user');

var logIn = function (req, res) {
    
    User.findOne({ user : req.body.user }, function (err, user){

        if(!err){

            if(user){

                if(!req.session.user){

                    req.session.user = req.body.user;
                    res.status(200).send({ description : 'OK'});

                } else {
                    res.status(401).send({ description : 'User is already loggedIn'});                    
                }

            } else {
                res.status(404).send({ description : 'User not found'});
            }

        } else {
            res.status(500).send(err);
        }

    });

};

module.exports = logIn;