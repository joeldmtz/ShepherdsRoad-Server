var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var config = require('../../config');

var routeSchema = new Schema({

    route_id : { type: Number, required: true },
    from : { type: String, require: true},
    toCity : { type: String, require: true},
    stopovers : {
        hasIt : { type: Boolean, required: true},
        places : [String]
    }

});

routeSchema.plugin(autoIncrement.plugin, { model: 'Route', field: 'route_id', startAt: 1 });

var Route = models.model('Route', routeSchema);

//Route.virtual('price').get(function (){
//
//    return (this.stopovers.hasIt)?config.prices.base:config.prices.base*config.prices.expressBonus;
//
//});

module.exports = Route;