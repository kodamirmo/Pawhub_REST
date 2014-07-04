var	mongoose 	= require('mongoose');
var extend 		= require('deep-extend');
var Entity 		= require('../models/Picture');
var fs 			= require('fs');
var http 		= require('http');
var url			= require('url');

var picTypes 		= ['albums','pets','reports','users'];
var allowedMimes	= ['image/jpeg','image/png','image/gif'];
var picSize 		= ['orig','small','mid','big'];

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
	var tmp_path = req.files.fieldNameHere.path;
	if(allowedMimes.indexOf(req.files.fieldNameHere.headers['content-type']) < 0){
		res.send(400, "This is not an allowed image format");
		deleteTempImage(tmp_path);
		return;
	}
	console.info("pasó");
	var type = req.params.type;
	if(picTypes.indexOf(type)<0){		
		res.send(400, "The picture correct type must be specified");
		deleteTempImage(tmp_path);
		return;
	}
	var picture = new Entity(req.body);
	picture.type = picTypes.indexOf(type);

	//Saves the Picture Entity
	picture.save(function(err,id,numberAffected){

		if(err){
			res.send({"err":err});
			return;
		}else{
			saveImages(type,id,'.jpg',tmp_path, function(err){
				if(err){
					res.send({"err":err});
					return;		
				}
				deleteTempImage(tmp_path);
			});
		}
	});

};

function deleteTempImage(tmp_path){
    fs.unlink(tmp_path, function() {
        res.send({"err":err});
    });
}

function saveImages(type,id,extension,tmp_path,next){

	var base_path = './uploads/' + type + '/';
	var target_path
	console.info(base_path);
	ensureDirectory(base_path + picSize[0], function(err, dirPath){
		//Reallocate by the type of image
		var target_path = dirPath + '/' + id.valueOf() + '.jpg';
	    fs.rename(tmp_path, target_path, function(err) {
	        if (err) {console.error(err)};
	        console.info(target_path);
	    });	
	});		
	
}

function ensureDirectory(path, callback){
	console.info(path);
	//verify the directories exist
	fs.exists(path, function(exists){
		console.info("exists:"+exists);
		if(!exists){			
			fs.mkdir(path,0777,function(err){
				console.info("err:"+err);
				console.info("path:"+path);
				if (err) {console.error(err);};
				callback(err,path);
			});

		}
	});
}