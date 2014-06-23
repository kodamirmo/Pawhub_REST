var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Picture		= require('Picture');
 
var userSchema = new Schema({
	uname : String,
	pass : String,
	email : String,
	type : String,
	petcoints : Number,
	yob : Number,
	country : String,

	date: Date,
	pic: {type = Schema.ObjectId, ref='Picture'},
	friends : [String],
	request : [String],
	socialNetworks : [Number,String]
});

module.exports = mongoose.model('User', userSchema);