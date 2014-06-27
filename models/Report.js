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
    _userId : {type:Schema.ObjectId, required:true},
    userName : {type:String , required:true},
    kind : {type:Number , required:true},
    type : { type:String, validate:typeValidator },
    description : String,
    reportCode : String,
    sharedCount : Number,
    solved : Boolean,
    picture : String,
    date : {type:Date, default: Date.now, required:true},
    location : Schema.Types.Mixed,
    linkedTo : [Number],
    viewedBy : [String],
    alertTo : [{type:Schema.ObjectId, ref:'User'}],
    comments : [Schema.Types.Mixed],
	detail : {type:Schema.Types.Mixed , required:true}
});

module.exports = mongoose.model('Report', reportSchema);

module.exports.isValidDetail = function (detail){
    if(detail._t){
        return ["abuse","found","lost","resque"].indexOf(detail._t)>-1;
    }else{
        return false;
    }
}

reportSchema.pre('save', function (next) {
    //if (this.isValidDetail(this.detail))
    next();
});