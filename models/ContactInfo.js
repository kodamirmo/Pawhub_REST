var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var contactInfoSchema = new Schema({
    name : String,
    address : String,
    emails : [String],
    phones : [String]
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);