var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var basicUserSchema = new Schema({
    userName : String,
    userLastName : String,
    userEmail : String,
    userCity : String,
    date : Date
});

module.exports = mongoose.model('BasicUser', basicUserSchema);