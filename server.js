//-------------------------Module "Importing"-----------------------------//
var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

//modules required (same idea of #includes or Imports)
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request
var server = require('http').createServer(app); //creates an HTTP server instance
var extend = require('util')._extend; //used to make copy of objects -> extend({}, objToCopy);

//-------------------------Globals-----------------------------//
var localIP = require("ip").address(); //used to know where to check for web view site
console.log("Local IP: " + localIP);

var defaultPlayer = require('./setup/defaultPlayer'); //used as template for first time login

var debugMode = false;
//-------------------------getting funtions/routes from other files-----------------------------//
//api to mongoose calls
var api = require('./routes/api');

//-------------------------Sets up MongoDB Connection-----------------------------//
var mongoURI = "mongodb://127.0.0.1:27017/EggPlant"; //localhost:defaultPort/dataBase

//sets up Mongoose
var mongoose = require('mongoose'); //added for Mongo support
var MongooseDB = mongoose.connect(mongoURI).connection; //makes connection
MongooseDB.on('error', function(err) { console.log(err.message); console.log("Is MongoDB Running?"); });
MongooseDB.once('open', function() {
  console.log("mongooseDB connection open");
});
      
//-------------------------Node Setup-----------------------------//
//Loops through starting after "node server.js" and checks the arguments
for (var i = 2; i < process.argv.length; i++) {
    switch(process.argv[i]){
        case "-debug":
            console.log("RUNNING IN DEBUG MODE");
            debugMode = true;
    }
}

//-------------------------Express JS configs-----------------------------//


//Express making use of these modules
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //sets all static file calls to folder


//-------------------------ROUTES-----------------------------//
app.use('/api', api); //sets the API used to access the Database

//device from 192.168.1.200 should be:
// /play/200
app.get('/song/:id', function(req, res, next) {    
    console.dir(req.body);
    res.send("todo");
});


//-------------------------HTTP Server Config-----------------------------//
server.listen(8451); //Port to listen on
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}



