var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var routeSchema = new Schema({

    route_id : { type: Number, required: true },
    from : { type: String, required: true},
    toCity : { type: String, required: true},
    stopovers : {
        hasIt : { type: Boolean, required: true},
        places : [String]
    }

});

routeSchema.plugin(autoIncrement.plugin, { model: 'Route', field: 'route_id', startAt: 1 });

var Route = models.model('Route', routeSchema);

module.exports = Route;