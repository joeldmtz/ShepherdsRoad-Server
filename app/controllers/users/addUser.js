var User = require('../../models/user');

var addUser = function (req, res){
debugger;
    var user = new User({

        user : req.body.user,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password : req.body.password || "hola"

    });
    req.session.user = "Hoal";
    user.save(function (err){

        if(!err){

            user.nextCount(function (err){
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

module.exports = addUser;