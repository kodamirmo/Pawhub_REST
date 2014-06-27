var	express = require('express'),
	mongoose	= require('mongoose'),
	reports = require('./routes/lostandfound/reports'),
	users = require('./routes/users'),
	params = require('express-params'),
	modelExtension = require('./utilities/model-extensions');
	//Report = require('./models/Report');
	//users 	= require('./routes/lostandfound/users');

var app = express();
 
params.extend(app);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger('dev')); // default, short, tiny, dev 
});

//***************************************************
//Database connection
//***************************************************
mongoose.connect('mongodb://localhost/pawhub');


//***************************************************
//routes definition
//***************************************************

var idRegExp =/[0-9a-fA-F]{24}$/;
app.param('id',idRegExp);

/********************REPORTS*********************/
//This regexp accepts: /lnf/reports{/lost}{/user/522e8aaf18f9bf1f64555555}{/page/5}{/per_page/10}
var reportsRegExp = /^\/lnf\/reports(\/(lost|found|resque|abuse))*(\/user\/([0-9a-fA-F]{24}))*(\/page\/([0-9]{1,3}))*(\/per_page\/([0-9]{1,3}))*\/*$/;

app.get(reportsRegExp, reports.findPaged);
app.get("/lnf/reports/:id", reports.findById);
app.post("/lnf/reports", reports.add);
app.put("/lnf/reports", reports.update);
app.delete("/lnf/reports/:id", reports.delete);

app.post("/lnf/reports/setalert/:id", reports.setAlert);
app.post("/lnf/reports/comment/:id", reports.comment);
app.post("/lnf/reports/setviewed/:id", reports.setViewed);

/********************USERS*********************/
//This regexp accepts: /lnf/reports{/lost}{/user/522e8aaf18f9bf1f64555555}{/page/5}{/per_page/10}
var usersRegExp = /^\/users(\/page\/([0-9]{1,3}))*(\/per_page\/([0-9]{1,3}))*\/*$/;

app.get(usersRegExp, users.findPaged);
app.get("/users/:id", users.findById);
app.post("/users", users.add);
app.put("/users", users.update);
app.delete("/users/:id", users.delete);

//***************************************************
//RUN APP
//***************************************************
app.listen(3005);
console.log('Server running at http://127.0.0.1:3005/');
console.log('...');