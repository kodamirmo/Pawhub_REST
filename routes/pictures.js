var	mongoose 	= require('mongoose');
var extend 		= require('deep-extend');
var Entity 		= require('../models/Picture');
var fs 			= require('fs');
var http 		= require('http');
var url			= require('url');

var picTypes = ['albums','pets','reports','users'];

module.exports.findPaged = function(req,res){
	var filter = {};
	if(req.params[1]){filter.kind = picTypes.indexOf(req.params[1]);}

	var page = req.params[3];
	var perpage = req.params[5];	

	Entity.findPaged(filter,page,perpage,function(err, result){
		res.send(result);
	});
};

module.exports.get = function(req,res){
	var _id = req.params.id;
	var type;

	Entity.findOne({'_id':_id}, function(err, doc){
		if(err){
			res.send({"err":err});
			return;
		}
		if(doc == null){
			res.send(404);
			return;
		}
		type = picTypes[doc.type];		

		fs.readFile('uploads/' + type + '/' + _id + '.jpg', function(err, data){
			console.info(err);
			if(err){
				res.send(404);
				return;
			}
			res.writeHead(200, {'Content-Type' : 'image/jpg'});
			res.end(data,'binary');	
		});
	});

};

module.exports.uploadFile = function(req, res, next) {
	var type = req.params.type;
	if(picTypes.indexOf(type)<0){		
		res.send(400, "The picture correct type must be specified");
		return;
	}
	var picture = new Entity(req.body);
	picture.type = picTypes.indexOf(type);
	console.info(picture);
	//Saves the Picture Entity
	picture.save(function(err,doc,numberAffected){
		console.log(err);
		if(err){
			res.send({"err":err});
			return;
		}else{
			console.info(type);
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