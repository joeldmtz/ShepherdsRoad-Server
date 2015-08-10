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
app.use(bodyParser.json());
app.use(methodOverride());

//Sessions
app.use(session({
    store: new RedisStore({
        host : config.db.session.host,
        port : config.db.session.port,
        db: config.db.session.db,
        pass : config.db.session.pass
    }),
    secret: config.db.session.secret,
    resave : true,
    saveUninitialized : true
}));


//Routes
var router = require('./app/routes/router'),
    adminRouter = require('./app/routes/admin');

app.use('/api/v1', router);
app.use('/api/v1/admin', adminRouter)

server.listen(process.env.PORT || 5000);

