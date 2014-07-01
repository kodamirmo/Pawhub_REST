var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var multilingualContentSchema = new Schema({
    culture : String,
    content : String,
    _id: false
});

module.exports = mongoose.model('MultilingualContent', multilingualContentSchema);
module.exports.Schema = multilingualContentSchema;