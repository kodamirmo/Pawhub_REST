var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
    ContactInfo = require('./ContactInfo');
 
var resqueSchema = new Schema({
	_t	: {type:String, default: "resque"},
    contactInfo : [ContactInfo]
});

module.exports = mongoose.model('Resque', resqueSchema);