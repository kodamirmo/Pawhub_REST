var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var abuseSchema = new Schema({
    isAnonimous : Boolean
});

module.exports = mongoose.model('Abuse', abuseSchema);
 
var foundSchema = new Schema({
    breeds : [Number],
    size : String
});

module.exports = mongoose.model('Found', foundSchema);
 
var lostSchema = new Schema({
    reward : Boolean,
    size : String,
    contactInfo : ContactInfo,
    breeds : [Number]
});

module.exports = mongoose.model('Lost', lostSchema);
 
var resqueSchema = new Schema({
    contactInfo : ContactInfo
});

module.exports = mongoose.model('Resque', resqueSchema);