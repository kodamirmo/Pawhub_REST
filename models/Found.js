var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var foundSchema = new Schema({
	_t	: {type:String, default: "found", requied:true},
    breeds : [Number],
    size : String
});

module.exports = mongoose.model('Found', foundSchema);