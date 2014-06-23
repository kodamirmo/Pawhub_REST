var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	BasicUser	= require('BasicUser');
 
var socialUsersSchema = new Schema({
    twitter : [BasicUser],
    facebook : [BasicUser],
    gplus : [BasicUser],
    others : [BasicUser]
});

module.exports = mongoose.model('SocialUsersSchema', socialUsersSchema);