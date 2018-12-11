var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5222;

app.get('/', function(req, res){
  console.log("http request from: " + req.connection.remoteAddress);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  console.log("socket connection...");
  
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

// listen for console input and sends it as admin: input_value

var stdin = process.openStdin();
var input="";
stdin.addListener("data", function(input_data){
	
	input=input_data.toString().trim(); // removes newLine from the end of the file
	
	io.emit("chat message", "admin: " + input);	
	
});
