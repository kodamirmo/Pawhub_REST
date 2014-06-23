var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var userAlertSchema = new Schema({
	_userId	: {type : Schema.ObjectId, ref : 'User'},
	_reportId	: {type : Schema.ObjectId, ref : 'Report'},
	date : Date,
    alert : Boolean
});

module.exports = mongoose.model('UserAlert', userAlertSchema);