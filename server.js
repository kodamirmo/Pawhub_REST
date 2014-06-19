var	express = require('express'),
	mongoose	= require('mongoose'),
	reports = require('./routes/lostandfound/reports');
	//Report = require('./models/Report');
	//users 	= require('./routes/lostandfound/users');

var app = express();

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
var reportsRegExp = /^\/reports(\/(lost|found|resque|abuse))*(\/page\/(\d))*(\/per_page\/(\d))*\/*$/;

app.get(reportsRegExp, reports.findPaged);
app.get("/reports/:id", reports.findById);

app.post("/reports/", reports.add);
app.put("/reports", reports.update);
app.delete("/reports/:id", reports.delete);


//***************************************************
//RUN APP
//***************************************************
app.listen(3005);
console.log('Server running at http://127.0.0.1:3005/');