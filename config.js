var config = {

    db : {
        host : 'mongodb://'+ process.env.MONGO_USER +':'+ process.env.MONGO_PASS +'@ds031873.mongolab.com:31873/shepherdsroad',
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