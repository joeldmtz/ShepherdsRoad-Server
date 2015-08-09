var User = require('../../models/user');

var _ = require('underscore');

var getUsers = function (req, res){

    User.find()
    .select('-_id -__v -password')
    .sort('user_id')
    .exec(function (err, users){

        if(!err){

            var u;

            var usersAsJson = _.map(users, function (user){
                u = user.toJSON();
                return u;

            });

            res.status(200).send(usersAsJson);


        } else {

            res.status(500).send(err);
        }

    });

};

module.exports = getUsers;