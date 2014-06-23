var	express = require('express'),
	mongoose	= require('mongoose'),
	reports = require('./routes/lostandfound/reports'),
	params = require('express-params');
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

/********************REPORTS*********************/
var reportsRegExp = /^\/lnf\/reports(\/(lost|found|resque|abuse))*(\/page\/(\d))*(\/per_page\/(\d))*\/*$/;
var idRegExp =/[0-9a-fA-F]{24}$/;
app.param('id',idRegExp);

app.get(reportsRegExp, reports.findPaged);
app.get("/lnf/reports/:id", reports.findById);
app.post("/lnf/reports", reports.add);
app.put("/lnf/reports", reports.update);
app.delete("/lnf/reports/:id", reports.delete);

app.post("/lnf/reports/setalert/:id", reports.setAlert);
//***************************************************
//RUN APP
//***************************************************
app.listen(3005);
console.log('Server running at http://127.0.0.1:3005/');