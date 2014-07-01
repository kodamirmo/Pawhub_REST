var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var pushDeviceSchema = new Schema({
    deviceId : {type:String, unique:true, required:true},
    os : {type:String, required:true},
    date : {type:Date, required:true, default:Date.now}
});

module.exports = mongoose.model('PushDevice', pushDeviceSchema);