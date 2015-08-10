var Report = require('../../models/report');

var _ = require('underscore');

var getReports = function (req, res){

    Report.find()
    .select('-_id -__v')
    .sort('-day')
    .exec(function (err, reports){

        if(!err){

            var r;

            var reportsAsJson = _.map(reports, function (report){

                r = report.toJSON();

                return r;

            });

            res.status(200).send(reportsAsJson);

        } else{
            res.status(500).send(err);
        }


    });

};

module.exports = getReports;