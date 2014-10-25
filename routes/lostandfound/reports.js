var	mongoose 	= require('mongoose');
var ObjectId	= require('objectid');
var Report 		= require('../../models/Report');
var UserAlert 	= require('../../models/UserAlert');
var extend 		= require('deep-extend');
var Comment		= require('../../models/Comment');

var reportKinds = ["abuse","found","lost","resque"];

module.exports.findPaged = function(req,res){
	console.log("checkpoint");
	var filter = {};
	if(req.params[3]){filter._userId = req.params[3];}
	if(req.params[1]){filter.kind = reportKinds.indexOf(req.params[1]);}

	var page = req.params[5];
	var perpage = req.params[7];	

	Report.findPaged(filter,page,perpage,function(err, result){
		res.send(result);
	});
};

module.exports.findById = function(req,res){
	var _id = req.params.id;

	Report.findOne({'_id':_id}, function(err, reports){
		res.send(reports);
	});
};

module.exports.add = function(req,res){
	//overrides the date and use the default
	req.body.date = new Date();
	var report = new Report(req.body).save(function(err,report,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(report);
			}
		}
	);
};

module.exports.update = function(req,res){
	var _id = req.params.id;

	//Validation
	if(!Report.isValidDetail(req.body.detail)){
		res.send(404,"Invalid Detail");
	}
	Report.findOne({'_id':_id},function(err,doc){
		if(doc){
			extend(doc,req.body);
			doc.save(function(err,report,numberAffected){
				if(err){
					res.send({"err":err});
				}else{
					res.send(report);
				}
			});
		}
	});
};

module.exports.delete = function(req,res){
	var _id = req.params.id;
	BasicUser.findOneAndRemove(_id, function(err,doc){
			if(err){
				res.send({"err":err});
			}else{
				res.send(doc);
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

		Report.findOne({'_id':_id},function(err,doc){
			if(doc){
				if(userAlert.alert){
					doc.alertTo.addToSet(userAlert._userId);
				}else{
					doc.alertTo.remove(userAlert._userId);
				}
				doc.save(function(err,report,numberAffected){
					if(err){
						res.send({"err":err});
					}else{
						res.send(report);
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

	Report.findOne({'_id':_id},function(err,doc){
		if(doc){
			doc.viewedBy.addToSet(_userId);
			doc.save(function(err,report,numberAffected){
				if(err){
					res.send({"err":err});
				}else{
					res.send(report);
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

		Report.findOne({'_id':_id},function(err,doc){
			if(doc){
				console.info(doc);
				doc.comments.addToSet(comment);				
				doc.save(function(err,report,numberAffected){
					if(err){
						res.send({"err":err});
					}else{
						res.send(report);
					}
				});
			}
		});
	});	
};

module.exports.populateReports = function(req,res){
	populateReports();
	res.send(200);
}

function populateReports() {

    var reports = [{"_id":"52fb08a8ba26191dd80e32ae","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ad","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ac","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"lost":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ab","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"abuse":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32aa","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a9","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a8","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"lost":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a7","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"abuse":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a6","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a5","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}}];
 
    var promise = Report.create(reports);    
    promise.then(function(report){
        //do something
    });

};