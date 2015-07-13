var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;


var tripSchema = new Schema({

    trip_id : { type: Number, required: true },
    depart : { type: Date, required: true },
    route : {
        type : Schema.Types.ObjectId,
        ref : 'Route' 
    },
    seats : { type: Number, default: 32, required: true }


});

tripSchema.plugin(autoIncrement.plugin, { model: 'Trip', field: 'trip_id', startAt : 1 });

var Trip = models.model('Trip', tripSchema);

module.exports = Trip;