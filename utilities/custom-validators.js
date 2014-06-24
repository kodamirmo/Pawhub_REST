var mongoose = require('mongoose'),
    validate = require('mongoose-validator').validate,
    ObjectId = require('objectid');


require('mongoose-validator').extend('isObjectId', function () {
	console.info(this.str);
    return  ObjectId.isValid(this.str);
}, 'Not a ObjectId');