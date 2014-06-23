var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var pushDeviceSchema = new Schema({
    deviceId : String,
    os : String,
    date : Date
});

module.exports = mongoose.model('PushDevice', pushDeviceSchema);