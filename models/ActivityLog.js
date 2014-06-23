var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var activityLogSchema = new Schema({
	date : Date,
    activityType : Number,
    session : String
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);