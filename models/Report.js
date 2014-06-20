var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
    Lost        = require('./Lost'),
    Found       = require('./Found'),
    Abuse       = require('./Abuse'),
    Resque      = require('./Resque');
 
//**********custom validator ********************
typeValidator = [function (val){
    return ['cat','dog','other'].indexOf(val)>-1;
},"is not a valid pet type"];

//*************Schema definition*****************
var reportSchema = new Schema({
    _userId : Schema.Types.ObjectId,        
    userName : String,
    kind : Number,
    type : { type:String, validate:typeValidator },
    description : String,
    reportCode : String,
    sharedCount : Number,
    solved : Boolean,
    picture : String,
    date : {type:Date, default: Date.now},
    location : Schema.Types.Mixed,
    linkedTo : [Number],
    viewedBy : [String],
    alertTo : [String],
    comments : [Schema.Types.Mixed],
	detail : Schema.Types.Mixed
});

module.exports = mongoose.model('Report', reportSchema);

module.exports.isValidDetail = function (detail){
    if(detail._t){
        return ["abuse","found","lost","resque"].indexOf(detail._t)>-1;
    }else{
        return false;
    }
}