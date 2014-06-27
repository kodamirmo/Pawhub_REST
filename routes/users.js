var	mongoose 	= require('mongoose');
var ObjectId	= require('objectid');
var User 		= require('../models/User');;

var userKinds = ["abuse","found","lost","resque"];

module.exports.findPaged = function(req,res){

	var page = req.params[1];
	var perpage = req.params[3];	

	User.findPaged({},page,perpage,function(err, result){
		res.send(result);
	});
};

module.exports.findById = function(req,res){
	var _id = req.params.id;

	User.findOne({'_id':_id}, function(err, users){
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


module.exports.setAlert = function(req,res){
	var _id = req.params.id;
	var userAlert = new UserAlert(req.body).validate(function(err){
		if(err){
			res.send({"err":err});
			return;
		}

		User.findOne({'_id':_id},function(err,doc){
			if(doc){
				if(userAlert.alert){
					doc.alertTo.addToSet(userAlert._userId);
				}else{
					doc.alertTo.remove(userAlert._userId);
				}
				doc.save(function(err,user,numberAffected){
					if(err){
						res.send({"err":err});
					}else{
						res.send(user);
					}
				});
			}
		});
	});	
};

module.exports.setViewed = function(req,res){
	var _id = req.params.id;
	var _userId  = req.body._userId;
	if(!ObjectId.isValid(_userId)){
		res.send(400);
	}

	User.findOne({'_id':_id},function(err,doc){
		if(doc){
			doc.viewedBy.addToSet(_userId);
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

module.exports.comment = function(req,res){
	var _id = req.params.id;
	var comment = new Comment(req.body).validate(function(err){
		if(err){
			res.send({"err":err});
			return;
		}

		User.findOne({'_id':_id},function(err,doc){
			if(doc){
				console.info(doc);
				doc.comments.addToSet(comment);				
				doc.save(function(err,user,numberAffected){
					if(err){
						res.send({"err":err});
					}else{
						res.send(user);
					}
				});
			}
		});
	});	
};