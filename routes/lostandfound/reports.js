var ObjectID = require("mongodb").ObjectID
var	mongoose 	= require('mongoose');
var Report = require('../../models/Report');
var extend = require('deep-extend');

exports.findPaged = function(req,res){
	var filter = req.params[1]?{ type : req.params[1]}:{};
	var page ={
		skip:req.params[3]?Number(req.params[3]):0,
		limit:req.params[5]?Number(req.params[5]):20
	};
	Report.find(filter,{},page,function(err, reports){
		res.send(reports);
		//populateReports();
	});
};

exports.findById = function(req,res){
	var id = req.params.id;
	var pageNumber = req.params.page;
	var checkObjecId = new RegExp("^[0-9a-fA-F]{24}$")
	if(checkObjecId.test(id)){
		Report.findOne({_id:id}, function(err, reports){
			res.send(reports);
		});
	}else{
		res.send(400);
	}
};

exports.add = function(req,res){
	var report = new Report(req.body).save(function(err,report,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(report);
			}
		}
	);
};

exports.update = function(req,res){
	//Validation
	if(!Report.isValidDetail(req.body.detail)){
		res.send(404,"Invalid Detail");
	}
	Report.findOne(req.body._id,function(err,doc){
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

exports.delete = function(req,res){
	Report.findByIdAndUpdate(req.body._id, function(err,report,numberAffected){
			if(err){
				res.send({"err":err});
			}else{
				res.send(numberAffected);
			}
		}
	);
};

function populateReports() {

    var reports = [{"_id":"52fb08a8ba26191dd80e32ae","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ad","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ac","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"lost":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32ab","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"abuse":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a8ba26191dd80e32aa","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a9","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a8","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"lost":{"reward":true,"size":"large","breeds":[1,2],"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a7","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"abuse":{"isAnonimous":true,"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a6","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"resque":{"contactInfo":{"name":"JC","address":"Conocido","email":["julioavilasaavedra@gmail.com"],"phones":["9999999999"]},"date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}},{"_id":"52fb08a7ba26191dd80e32a5","_userId":"522e8aaf18f9bf1f64555555","type":"dog","description":"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.","location":{"lat":"09280980980","lon":"098029834092"},"detail":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]},"found":{"breeds":[1,2],"size":"mid","date":"2014-02-10T22:00:00-08:00","address":"Calle wallabe 124, La conchita","name":"floppy","age":"2.5 yo","characteristics":"verde con motas rojas","pics":[]}}];
 
    var promise = Report.create(reports);    
    promise.then(function(report){
        //do something
    });

};