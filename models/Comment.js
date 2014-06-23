var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	User		= require('User');
 
var commentSchema = new Schema({
    _userId : {type : Schema.Types.ObjectId, ref : 'User'},
    content : String,
    date : Date
});

module.exports = mongoose.model('Comment', commentSchema);