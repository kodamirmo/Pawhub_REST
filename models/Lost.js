var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
    ContactInfo = require('./ContactInfo');
 
var lostSchema = new Schema({
	_t	: {type:String, default: "lost", requied:true},
    reward : Boolean,
    size : String,
    contactInfo : [ContactInfo],
    breeds : [Number]
});

module.exports = mongoose.model('Lost', lostSchema);