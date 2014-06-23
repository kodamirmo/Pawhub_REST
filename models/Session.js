var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var sessionSchema = new Schema({
    location : Schema.Types.Mixed,
    online : Boolean,
    date : Date
});

module.exports = mongoose.model('session', sessionSchema);