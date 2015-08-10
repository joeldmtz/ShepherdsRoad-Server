var controllers = '../controllers'

var router = require('express').Router();

var addUser = require(controllers + '/users/addUser'),
    getUsers = require(controllers + '/users/getUsers'),
    deleteUser = require(controllers + '/users/deleteUser'),
    updateUser = require(controllers + '/users/updateUser');

var addRoute = require(controllers + '/routes/addRoute'),
    deleteRoute = require(controllers + '/routes/deleteRoute'),
    updateRoute = require(controllers + '/routes/updateRoute');

var addTrip = require(controllers + '/trips/addTrip'),
    deleteTrip = require(controllers + '/trips/deleteTrip'),
    updateTrip = require(controllers + '/trips/updateTrip');

var updateRegistry = require(controllers + '/registries/updateRegistry');

var addReport = require(controllers + '/reports/addReport');


router.route('/user')
    .post(addUser)
    .get(getUsers);

router.route('/user/:id')
    .put(updateUser)
    .delete(deleteUser);

router.route('/route')
    .post(addRoute)

router.route('/route/:id')
    .put(updateRoute)
    .delete(deleteRoute);

router.route('/trip')
    .post(addTrip);

router.route('/trip/:id')
    .put(updateTrip)
    .delete(deleteTrip);

router.route('/sell/:serial')
    .put(updateRegistry);

router.route('/report')
    .post(addReport);


module.exports = router;