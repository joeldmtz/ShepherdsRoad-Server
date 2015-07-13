var controllers = '../controllers'

var router = require('express').Router();

var addUser = require(controllers + '/users/addUser'),
    getUsers = require(controllers + '/users/getUsers'),
    logIn = require(controllers + '/users/logIn'),
    logOut = require(controllers + '/users/logOut');

var addRoute = require(controllers + '/routes/addRoute'),
    getRoutes = require(controllers + '/routes/getRoutes');

var addTrip = require(controllers + '/trips/addTrip'),
    getTrips = require(controllers + '/trips/getTrips');

var addRegistry = require(controllers + '/registries/addRegistry'),
    getRegistries = require(controllers + '/registries/getRegistries');

router.route('/user/session')
    .post(logIn)
    .delete(logOut);

router.use(function (req, res, next){
   
   if(!req.session.user){

        res.status(403).send({ description : "You aren't loggedIn "});
        return;
   }

   next();

});

router.route('/user')
    .post(addUser)
    .get(getUsers);

router.route('/route')
    .post(addRoute)
    .get(getRoutes);

router.route('/user/:id')
    .get()
    .put()
    .delete()

router.route('/trip')
    .get(getTrips)
    .post(addTrip);

router.route('/trip/:id')
    .get()
    .put()
    .delete()

router.route('/sell')
    .get(getRegistries)
    .post(addRegistry);

router.route('/sell/:serial')
    .get()
    .put()

module.exports = router;