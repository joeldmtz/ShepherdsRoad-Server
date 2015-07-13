var User = require("../../models/user");

var logOut = function (req, res) {
    
    if(req.session.user){

        req.session.destroy();
        res.status(200).send({ description : 'OK' });
    } else {
        res.send(404);
    }

};

module.exports = logOut;