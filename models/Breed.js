var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Picture		= require('Picture');
 
var breedSchema = new Schema({
    name:[MultilingualContent],
    picture : {type : Schema.Types.ObjectId, ref : 'Picture'}
});

module.exports = mongoose.model('Breed', breedSchema);