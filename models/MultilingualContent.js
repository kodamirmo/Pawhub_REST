var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var multilingualContentSchema = new Schema({
    culture : String,
    content : String
});

module.exports = mongoose.model('MultilingualContent', multilingualContentSchema);