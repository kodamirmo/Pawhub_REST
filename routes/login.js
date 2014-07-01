var	mongoose 	= require('mongoose');
var ObjectId	= require('objectid');
var User 		= require('../models/User');;

module.exports.digest = function(username, done) {
    User.findOne({ uname: username }, function (err, user) {
    	console.info(done);
    	if (err) { return done(err); }
    	if (!user) { return done(null, false); }
    	return done(null, user, user.pass);
    });    
  };

module.exports.digestFailed = function(params, done) {
	console.info("check point");
	console.info(params);
	done(null, true)
};

module.exports.me = function(req, res) {
	console.info(req.user);
    res.json(req.user);
};