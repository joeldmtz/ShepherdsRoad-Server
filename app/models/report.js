var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var reportSchema = new Schema({

    // report_id : { type : Number, required : true },
    // day : { type : Date, required : true },
    // registries : [{
    //     regis_id : { type : Number },
    //     trip : { type : String},
    //     depart : { type : Date },
    //     day : { type : Date},
    //     seat : { type : Number},
    //     user : { type : String},
    //     price : { type : Number}
    // }],
    // total : { type : Number, required : true },
    // totalTrips : { type : Number, required : true },
    // trips: [{
    //     trip_id : { type : Number},
    //     trip : { type : String},
    //     depart : { type : Date },
    //     total : { type : Number}
    // }]

    report_id : { type : Number, required : true },
    day : { type : Date, required : true },
    registries : [{

        regis_id : { type: Number, required: true },
        day : { type: Date, required: true },
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
            from : { type: String, required: true},
            toCity : { type: String, required: true},
            day : { type: Date, required: true },
            seat : { type: Number, required: true}
        },
        price : { type: Number, required: true }


    }],
    total : { type : Number, required : true },
    totalTrips : { type : Number, required : true },
    trips: [{

        trip_id : { type: Number, required: true },
        depart : { type: Date, required: true },
        route : {
            type : Schema.Types.ObjectId,
            ref : 'Route' 
        },
        seats : { type: Number, default: 32, required: true },
        active : { type : Boolean, default: true, required : true },
        price : { type: Number, required: true },
        total : { type: Number, required: true }


    }]

});

reportSchema.plugin(autoIncrement.plugin, { model: 'Report', field: 'report_id', startAt : 1 });

var Report = models.model('Report', reportSchema);

module.exports = Report;