var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var reportSchema = new Schema({
    _userId : Schema.Types.ObjectId,        
    userName : String,
    kind : Number,
    type : String,
    description : String,
    reportCode : String,
    sharedCount : Number,
    solved : Boolean,
    picture : String,
    date : {type:Date, default: Date.now},
    //Location location : ,
    linkedTo : [Number],
    viewedBy : [String],
    alertTo : [String],
    //comments : [Comment],
	detail : Schema.Types.Mixed
});

module.exports = mongoose.model('Report', reportSchema);