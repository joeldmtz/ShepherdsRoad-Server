var controllers = '../controllers'

var router = require('express').Router();

var addUser = require(controllers + '/users/addUser'),
    getUsers = require(controllers + '/users/getUsers'),
    logIn = require(controllers + '/users/logIn'),
    logOut = require(controllers + '/users/logOut');

var addRoute = require(controllers + '/routes/addRoute'),
    getRoutes = require(controllers + '/routes/getRoutes');

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
    .get()
    .post()

router.route('/trip/:id')
    .get()
    .put()
    .delete()

router.route('/sell')
    .get()
    .post()

router.route('/sell/:serial')
    .get()
    .put()

router.use(function (req, res){

    if(req.z.length){

        req.z.forEach(function (item){

            delete item._id;
            delete item.__v;

        });

    } else{

        delete req.z._id;
        delete req.z.__v;

    }


    res.send(req.z);

});

module.exports = router;