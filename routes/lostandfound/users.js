ar	mongoose 	= require('mongoose');
var ObjectId	= require('objectid');
var User 		= require('../models/User');;

module.exports.findPaged = function(req,res){

	var page = req.params[1];
	var perpage = req.params[3];	

	User.findPaged({},page,perpage,function(err, result){
		res.send(result);
	});
};

module.exports.findById = function(req,res){
	var _id = req.params.id;

	console.log("Buscando usuario:", _id);

	User.findOne({'_id':_id}, function(err, users){

		console.log("Error ", err);
		console.log("Users ", users);

		if(!users)
			res.send(404);

		res.send(users);
	});
};

module.exports.add = function(req,res){
	//overrides the date and use the default
	req.body.date = new Date();
	var user = new User(req.body).save(function(err,user,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(user);
			}
		}
	);
};

module.exports.update = function(req,res){
	var _id = req.params.id;

	//Validation
	if(!User.isValidDetail(req.body.detail)){
		res.send(404,"Invalid Detail");
	}
	User.findOne({'_id':_id},function(err,doc){
		if(doc){
			extend(doc,req.body);
			doc.save(function(err,user,numberAffected){
				if(err){
					res.send({"err":err});
				}else{
					res.send(user);
				}
			});
		}
	});
};

module.exports.delete = function(req,res){
	var _id = req.params.id;

	User.findByIdAndUpdate(_id, function(err,user,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(numberAffected);
			}
		}
	);
};
