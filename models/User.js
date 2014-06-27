var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Picture		= require('../models/Picture'),
	validate = require('mongoose-validator').validate;
 
var userSchema = new Schema({
	uname : { type:String, required:true },
	pass : { type:String, required:true },
	email : { type:String, required:true, validate:validate('isEmail') },
	type : { type:String, required:true, default:'social' }, //TODO: Determinar los tipos de usuario
	petcoints : Number,
	yob : Number,
	country : String,

	date: { type:Date, required:true, default:Date.now },
	pic: {type : Schema.ObjectId, ref : 'Picture'},
	friends : [Schema.ObjectId],
	request : [Schema.ObjectId],
	socialNetworks : [Number,String]
});

module.exports = mongoose.model('User', userSchema);