var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var reportSchema = new Schema({

    report_id : { type : Number, required : true },
    day : { type : Date, required : true },
    registries : [{
        trip : { type : String, required : true},
        seat : { type : Number, required : true},
        price : { type : Number, required : true}
    }],
    total : { type : Number, required : true },
    totalTrips: [{
        trip : { type : String, required : true},
        total : { type : Number, required : true}
    }]

});

reportSchema.plugin(autoIncrement.plugin, { model: 'Report', field: 'report_id', startAt : 1 });

var Report = models.model('Report', reportSchema);

module.exports = Report;