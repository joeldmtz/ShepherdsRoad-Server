var User = require('../../models/user');

var _ = require('underscore');

var getUsers = function (req, res, next){

    User.find()
    .sort('user_id')
    .exec(function (err, users){

        if(!err){

            var u;

            var usersAsJson = _.map(users, function (user){
                u = user.toJSON();
                return u;

            });

            req.z = usersAsJson;
            next();


        } else {

            res.status(500).send(err);
        }

    });

};

module.exports = getUsers;