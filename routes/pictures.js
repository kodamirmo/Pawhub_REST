var	mongoose 	= require('mongoose');
var extend 		= require('deep-extend');
var Entity 		= require('../models/Picture');
var fs 			= require('fs');

var picTypes = ['albums','pets','reports','users'];

module.exports.findPaged = function(req,res){
	var filter = {};
	if(req.params[3]){filter._userId = req.params[3];}
	if(req.params[1]){filter.kind = reportKinds.indexOf(req.params[1]);}

	var page = req.params[5];
	var perpage = req.params[7];	

	Entity.findPaged(filter,page,perpage,function(err, result){
		res.send(result);
	});
};

module.exports.get = function(req,res){
	var _id = req.params.id;

	Entity.findOne({'_id':_id}, function(err, docs){
		res.send(docs);
	});
};

module.exports.uploadFile = function(req, res, next) {
	var type = req.params.type;
	if(picTypes.indexOf(type)<0){		
		res.send(400, "The picture correct type must be specified");
		return;
	}

	//Saves the Picture Entity
	Entity(req.body).save(function(err,doc,numberAffected){
		console.log(err);
		if(err){
			res.send({"err":err});
			return;
		}else{

			var tmp_path = req.files.fieldNameHere.path;
		    var target_path = './uploads/' + type + '/' + doc._id + '.jpg';

			//Reallocate by the type of image
		    fs.rename(tmp_path, target_path, function(err) {
		        if (err) throw err;
		        console.info(tmp_path);
		        fs.unlink(tmp_path, function() {
		            res.send({"err":err});
		        });
		    });


		}
	});

};