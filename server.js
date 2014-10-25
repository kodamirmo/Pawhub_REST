var	express = require('express'),
	mongoose	= require('mongoose'),
	reports = require('./routes/lostandfound/reports'),
	users = require('./routes/users'),
	params = require('express-params'),
	modelExtension = require('./utilities/model-extensions'),
	passport = require('passport'),
	DigestStrategy = require('passport-http').DigestStrategy,
	login = require('./routes/login'),
	breeds = require('./routes/breeds'),
	kinds = require('./routes/kinds'),
	pushdevices = require('./routes/pushdevices'),
	signup = require('./routes/signup'),
	pictures = require('./routes/pictures');
	//Report = require('./models/Report');
	//users 	= require('./routes/lostandfound/users');

var app = express();
 
params.extend(app);

app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: "uploads", limit:'3mb'}));
	app.use(express.methodOverride());  
	//app.use(express.logger('dev')); // default, short, tiny, dev
	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(app.router);
});

//***************************************************
//Database connection
//***************************************************
mongoose.connect('mongodb://localhost/pawhub');

//*******************LOGIN************************
//Passport Authentication configuration
passport.use(new DigestStrategy({ qop: 'auth' }, login.digest, login.digestFailed));

//Passport routing
app.get('/login', passport.authenticate('digest', { session: false }), login.me);

//***************************************************
//routes definition
//***************************************************

var idRegExp =/[0-9a-fA-F]{24}$/;
app.param('id',idRegExp);

/********************SIGN IN*********************/
app.get("/basicusers",signup.findPaged);
app.get("/basicusers/:id",signup.findById);
app.post("/signup",signup.add);
app.put("/basicusers/:id",signup.update);
app.delete("/basicusers/:id",signup.delete);

/********************REPORTS*********************/
//This regexp accepts: /lnf/reports{/lost}{/user/522e8aaf18f9bf1f64555555}{/page/5}{/per_page/10}
var reportsRegExp = /^\/lnf\/reports(\/(lost|found|resque|abuse))*(\/user\/([0-9a-fA-F]{24}))*(\/page\/([0-9]{1,3}))*(\/per_page\/([0-9]{1,3}))*\/*$/;

app.get(reportsRegExp, reports.findPaged);
app.get("/lnf/reports/:id", reports.findById);
app.post("/lnf/reports", reports.add);
app.put("/lnf/reports", reports.update);
app.delete("/lnf/reports/:id", reports.delete);
app.get("/lnf/reports/populate", reports.populateReports);

app.post("/lnf/reports/setalert/:id", reports.setAlert);
app.post("/lnf/reports/comment/:id", reports.comment);
app.post("/lnf/reports/setviewed/:id", reports.setViewed);


/********************BREEDS*********************/
app.get("/breeds",breeds.findPaged);
app.get("/breeds/:id",breeds.findById);
app.post("/breeds",breeds.add);
app.put("/breeds/:id",breeds.update);
app.delete("/breeds/:id",breeds.delete);

/********************KINDS*********************/
app.get("/kinds",kinds.findPaged);
app.get("/kinds/:id",kinds.findById);
app.post("/kinds",kinds.add);
app.put("/kinds/:id",kinds.update);
app.delete("/kinds/:id",kinds.delete);

/********************USERS*********************/
//This regexp accepts: /lnf/reports{/lost}{/user/522e8aaf18f9bf1f64555555}{/page/5}{/per_page/10}
var usersRegExp = /^\/users(\/page\/([0-9]{1,3}))*(\/per_page\/([0-9]{1,3}))*\/*$/;

app.get(usersRegExp, users.findPaged);
app.get("/users/:id", users.findById);
app.post("/users", users.add);
app.put("/users/:id", users.update);
app.delete("/users/:id", users.delete);

/********************BREEDS*********************/
app.get("/pushdevices",pushdevices.findPaged);
app.post("/pushdevices",pushdevices.add);

/********************PICTURES*********************/
var picsRegExp = /^\/pics(\/(albums|pets|reports|users))*(\/page\/([0-9]{1,3}))*(\/per_page\/([0-9]{1,3}))*\/*$/;
app.get(picsRegExp, pictures.findPaged);
app.get("/pics/:id",pictures.get);
app.post("/pics/:type", pictures.uploadFile);

//***************************************************
//RUN APP
//***************************************************
app.listen(3005);
console.log('Server running at http://127.0.0.1:3005/');
console.log('...');