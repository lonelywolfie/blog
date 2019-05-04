const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
		name : String,
		age : Number,
		avatar : String,
		email : {type:String,unique:true},
		password : String
});

const User = mongoose.model('User', userSchema,'users');

module.exports = User;