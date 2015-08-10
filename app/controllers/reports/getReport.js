var Report = require('../../models/report');

var _ = require('underscore');

var getReport = function (req, res){

    var date = new Date();

    date.setYear(req.params.yy);
    date.setMonth(req.params.mm-1);
    date.setDate(req.params.dd);

    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(0);

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

                if(date.getYear() == yy && date.getMonth() == mm && date.getDate() == dd){
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