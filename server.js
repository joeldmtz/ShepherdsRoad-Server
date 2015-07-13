var express = require('express'),
    logger  = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    RedisStore = require("connect-redis")(session),
    cors = require('cors');

var config = require('./config');

var app = express(),
    server = require('http').Server(app);

// Logs
app.use(logger(':remote-addr || :method :url || :status :res[content-length] || :response-time ms'));

app.use(cors());

// Add POST, PUT, DELTE
app.use(bodyParser.urlencoded());
app.use(methodOverride());

//Sessions
app.use(session({
    store: new RedisStore({
        host : config.db.session.host,
        port : config.db.session.port,
        db: config.db.session.db
    }),
    secret: config.db.session.secret,
    resave : true,
    saveUninitialized : true
}));


//Routes
var router = require('./app/routes/router');
app.use('/api/v1', router);

server.listen(3000);

