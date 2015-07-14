var config = {

    db : {

        host : 'mongodb://joel:Dm199600@ds051738.mongolab.com:51738/shepherds-road',
        //host : "mongodb://localhost/" + "ShepherdsRoad",
        session : {
            host : 'pub-redis-10779.us-east-1-4.5.ec2.garantiadata.com',
            port : 10779,
            db : 0,
            secret : 'the_force_be_with_you',
            pass : 'Dm199600'
        }

    },
}

module.exports = config;