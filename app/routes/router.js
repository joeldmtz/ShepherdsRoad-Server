var controllers = '../controllers'

var router = require('express').Router();

var logIn = require(controllers + '/users/logIn'),
    logOut = require(controllers + '/users/logOut');

var getRoutes = require(controllers + '/routes/getRoutes')
    getPlaces = require(controllers + '/routes/getPlaces');

var getTrips = require(controllers + '/trips/getTrips'),
    getTripsByDate = require(controllers + '/trips/getTripsByDate'),
    getSeatsAvailable = require(controllers + '/trips/getSeatsAvailable');

var addRegistry = require(controllers + '/registries/addRegistry'),
    getRegistries = require(controllers + '/registries/getRegistries'),
    getRegistry = require(controllers + '/registries/getRegistry');

var getReports = require(controllers + '/reports/getReports'),
    getReport = require(controllers + '/reports/getReport');

router.route('/user/session')
    .post(logIn)
    .delete(logOut);

// router.use(function (req, res, next){
   
//    if(!req.session.user){

//         res.status(403).send({ description : "You aren't loggedIn "});
//         return;
//    }

//    next();

// });

router.route(':user/route')
    .get(getRoutes);

router.route(':user/route/place')
    .get(getPlaces)

//
router.route(':user/trip')
    .get(getTrips);

router.route(':user/trip/:yy/:mm/:dd')
    .get(getTripsByDate);

router.route(':user/trip/:id/:yy/:mm/:dd')
    .get(getSeatsAvailable);

//
router.route(':user/sell')
    .get(getRegistries)
    .post(addRegistry);

router.route(':user/sell/:serial')
    .get(getRegistry);

//
router.route(':user/report')
    .get(getReports);

router.route(':user/report/:yy/:mm/:dd')
    .get(getReport);

module.exports = router;