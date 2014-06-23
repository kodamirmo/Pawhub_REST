var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var locationSchema = new Schema({
    lat : String,
    lon : String
});

module.exports = mongoose.model('Location', locationSchema);