var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Picture		= require('Picture');
 
var kindSchema = new Schema({
    pic = {type : Schema.Types.ObjectId, ref : 'Picture'},
    breeds = [Breed],
    name = [MultilingualContent],
    description = [MultilingualContent],
    date : Date
});

module.exports = mongoose.model('Kind', kindSchema);