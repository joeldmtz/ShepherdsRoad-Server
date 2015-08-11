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

        regis_id : { type: Number },
        day : { type: Date },
        user : {

            user_id : { type: Number },
            password : { type: String },
            user : { type: String },
            firstName : { type: String },
            lastName : { type: String },
            active : { type : Boolean, default: true }

        },
        client : {
            firstName : { type: String } ,
            lastName: { type: String }
        },
        serial : { type: String },

        tripInfo : {
            trip : {

                trip_id : { type: Number },
                depart : { type: Date },
                route : {

                    route_id : { type: Number },
                    from : { type: String },
                    toCity : { type: String },
                    stopovers : {
                        hasIt : { type: Boolean },
                        places : [String]
                    },
                    active : { type : Boolean, default: true }

                },
                seats : { type: Number, default: 32 },
                active : { type : Boolean, default: true },
                price : { type: Number }


            },
            from : { type: String },
            toCity : { type: String },
            day : { type: Date },
            seat : { type: Number }
        },
        price : { type: Number }


    }],
    total : { type : Number, required : true },
    totalTrips : { type : Number, required : true },
    trips: [{

        trip_id : { type: Number },
        depart : { type: Date },
        route : {
            type : Schema.Types.ObjectId,
            ref : 'Route' 
        },
        seats : { type: Number, default: 32 },
        active : { type : Boolean, default: true },
        price : { type: Number },
        total : { type: Number }


    }]

});

reportSchema.plugin(autoIncrement.plugin, { model: 'Report', field: 'report_id', startAt : 1 });

var Report = models.model('Report', reportSchema);

module.exports = Report;