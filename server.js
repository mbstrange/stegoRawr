//-------------------------Module "Importing"-----------------------------//
var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var bodyParser = require('body-parser'); //allows the use of req.body in POST request

var app = express(); //creates an instance of express


//-------------------------Globals-----------------------------//
var localIP = require("ip").address(); //used to know where to check for web view site
console.log("Local IP: " + localIP);

var debugMode = false;
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
app.use(express.static(path.join(__dirname, 'public'))); //sets all static file calls to folder


//-------------------------ROUTES-----------------------------//

app.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/song/:id', function(req, res, next) {    
    console.dir(req.body);
    res.send("todo");
});


//-------------------------HTTP Server Config-----------------------------//
app.listen(8451); //Port to listen on
app.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

//-------------------------Binary Audio Server-----------------------------//
binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
    
  console.log('new connection from: ' + client.id);
  
  var outFile = "audio/" + "sound_" + client.id + ".wav"; 
    
  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 44100,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream started for:' + client.id);
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + outFile);
    });
  });
});


