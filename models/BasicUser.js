var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	validator	= require('mongoose-validator');

var basicUserSchema = new Schema({
    userName : {type:String, unique:true, required:true},
    userLastName : String,
    userEmail : {type:String, unique:true, required:true, validate:[validator.validate('isEmail')]},
    userCity : String,
    date : {type:Date, default: Date.now, required:true}
});

module.exports = mongoose.model('BasicUser', basicUserSchema);