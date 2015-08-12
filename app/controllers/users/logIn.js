var User = require('../../models/user');

var logIn = function (req, res) {
    
    if(req.params.user == 'admin'){

        if(req.params.pass == 'ppedro'){
            res.status(200).send({
                user : 'admin'
            });
        } else {
            res.status(403).send();
        }

    } else {

        User.findOne({ user : req.params.user }, function (err, user){

            if(!err){

                if(user){

                    if(user.toJSON().password == req.params.pass){

                        res.status(200).send(user.toJSON());

                    } else {
                        res.status(403).send();
                    }

                } else {
                    res.status(404).send();
                }

            } else {
                res.status(500).send(err);
            }

        });
        
    }


};

module.exports = logIn;