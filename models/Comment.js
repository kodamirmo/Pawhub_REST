var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	User		= require('../models/User');
 
var commentSchema = new Schema({
    _userId : {type : Schema.Types.ObjectId, required : true , ref : 'User'},
    content : {type : String, required : true },
    date : {type:Date, default: Date.now, required:true}
});

module.exports = mongoose.model('Comment', commentSchema);