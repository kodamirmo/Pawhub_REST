var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Picture		= require('./Picture'),
	BreedSchema = require('./Breed').Schema,
	MultilingualContentSchema = require('./MultilingualContent').Schema;
 
var kindSchema = new Schema({
    pic : {type : Schema.Types.ObjectId, ref : 'Picture'},
    breeds : [Schema.Types.ObjectId],
    name : {type:[MultilingualContentSchema], unique:true, required:true},
    description : [MultilingualContentSchema]
});

module.exports = mongoose.model('Kind', kindSchema);