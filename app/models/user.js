var models = require('./model').model,
    autoIncrement = require('./model').increment,
    Schema = models.Schema;

var userSchema = new Schema({

    user_id : { type: Number, required: true},
    password : { type: String, required: true},
    user : { type: String, required: true },
    firstName : { type: String, required: true },
    lastName : { type: String, required: true }

});

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'user_id', startAt : 1 });

var User = models.model('User', userSchema);

module.exports = User;