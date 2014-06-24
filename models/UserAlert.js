var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
    validate 	= require('mongoose-validator').validate,
    customValidators = require('../utilities/custom-validators');
 
var userAlertSchema = new Schema({
	_userId	: {type : Schema.ObjectId, required:true, ref : 'User', validate : [validate('isObjectId')]},
	_reportId	: {type : Schema.ObjectId, ref : 'Report', validate : [validate('isObjectId')]},
	date : Date,
    alert : {type: Boolean, required:true}
});

module.exports = mongoose.model('UserAlert', userAlertSchema);