var mongoose = require("mongoose"),
    config = require("../../config");
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect(config.db.host);

autoIncrement.initialize(connection);


module.exports.model = mongoose;
module.exports.increment = autoIncrement;