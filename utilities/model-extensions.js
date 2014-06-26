var	express = require('express'),
	mongoose	= require('mongoose');
var	Model = mongoose.Model;

Model.findPaged = function findPaged(conditions,page,perpage,callback){
	var pageOptions ={
		skip:page?page:0,
		limit:perpage?perpage:20,
		sort:{date:-1}
	};
	page = pageOptions.skip;	
	perpage = pageOptions.limit;

	var self = this;
	self.count(conditions,function(err, count){
		if(err){
			callback(err,null);
		}
		var total = count;

		self.find(conditions,{},pageOptions,function(err, docs){
			if(err){
				callback(err,null);
			}
			var result ={
					page:page,
					perpage:perpage,
					total:total,
					docs:docs
				};
				callback(err,result);
		});
			
	})
}