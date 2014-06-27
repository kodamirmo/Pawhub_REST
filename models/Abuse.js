var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var abuseSchema = new Schema({	
    _t	: {type:String, default: "abuse", requied:true},
    isAnonimous : Boolean
});

module.exports = mongoose.model('Abuse', abuseSchema);