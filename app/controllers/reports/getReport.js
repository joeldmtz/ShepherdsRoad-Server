var Report = require('../../models/report');

var _ = require('underscore');

var getReport = function (req, res){

    var date = new Date();

    date.setFullYear(req.params.yy);
    date.setMonth(req.params.mm);
    date.setDate(req.params.dd);

    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(0);

    Report.findOne({ day : date })
    .select('-_id -__v')
    .exec(function (err, report){

        if(!err){

            if(report){

                res.status(200).send(report.toJSON());
                
            } else {
                
                res.status(404).send();

            }


        } else{
            res.status(500).send(err);
        }


    });

};

module.exports = getReport;