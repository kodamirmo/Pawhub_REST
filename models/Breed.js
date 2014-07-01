var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	MultilingualContentSchema = require('./MultilingualContent').Schema,
	validator	= require('mongoose-validator');
 
var breedSchema = new Schema({
    name:{type:[MultilingualContentSchema], unique:true, required:true},
    picture : {type : Schema.Types.ObjectId, ref : 'Picture', unique:true, required:true}
});

module.exports = mongoose.model('Breed', breedSchema);
module.exports.Schema = breedSchema;