var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;
 
var pictureSchema = new Schema({
    _referenceId : String,
    date : Date,
    path : String,
    type : {type:Number, default: 0}
});

//PictureType:
//	albums = 	0,
//  pets = 		1,
//  reports = 	2,
//  users = 	3 

module.exports = mongoose.model('PictureSchema', pictureSchema);