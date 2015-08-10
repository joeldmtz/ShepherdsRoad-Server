var Report = require('../../models/report');

var _ = require('underscore');

var getReport = function (req, res){

    Report.find()
    .select('-_id -__v')
    .exec(function (err, reports){

        
        if(!err){

            var r, dd, mm, yy;
            var reportAsJson;

            _.each(reports, function (report){
                r=report.toJSON();

                yy=r.day.getYear();
                mm=r.day.getMonth();
                dd=r.day.getDate();

                if(req.params.yy == yy && req.params.mm-1 == mm && req.params.dd == dd){
                    reportAsJson = r;
                }

            })

            res.status(200).send(reportAsJson);
            

        } else{
            res.status(500).send(err);
        }


    });

};

module.exports = getReport;