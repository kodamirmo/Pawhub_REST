var	mongoose 	= require('mongoose');
var extend 		= require('deep-extend');
var Entity 	= require('../models/PushDevice');;

module.exports.add = function(req,res){
	Entity(req.body).save(function(err,user,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(user);
			}
		}
	);
};

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