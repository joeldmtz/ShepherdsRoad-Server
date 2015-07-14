var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var deepPopulate = require('mongoose-deep-populate');

var registrySchema = new Schema({

    regis_id : { type: Number, required: true },
    day : { type: Date, default: Date.now(), required: true },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    client : {
        firstName : { type: String, required: true},
        lastName: { type: String, require: true}
    },
    serial : { type: String, required: true},

    tripInfo : {
        trip : {
            type : Schema.Types.ObjectId,
            ref: 'Trip',
            required: true
        },
        day : { type: Date, required: true },
        seat : { type: Number, required: true}
    },
    price : { type: Number, required: true }


});

registrySchema.plugin(autoIncrement.plugin, { model: 'Registry', field: 'regis_id', startAt : 1 });

registrySchema.plugin(deepPopulate, {
    whitelist: [ 'tripInfo.trip.route'],
    populate : {

        'tripInfo.trip' : {
            select : '-_id -__v'
        },

        'tripInfo.trip.route' : {
            select : '-_id -__v'
        }
    }
});

var Registry = models.model('Registry', registrySchema);

module.exports = Registry;