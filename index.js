var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/report', function(req, res){
  res.sendfile('report.html');
});

app.get('/admin', function(req, res){
  res.sendfile('admin.html');
});

var voteData = {question:"Erste Frage",options:["Sebastian","Lena"],votes:{},showOptions:false};

io.on('connection', function(socket){
	console.log('a user connected');
	function update() {
		io.emit('update', voteData);
	}
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
socket.on('update', function(){
	update();
});
socket.on('reset', function(){
	voteData.votes = {};
	update();
});
socket.on('setQuestion', function(data){
	voteData.question = data.question;
	voteData.options = data.options;
	voteData.showOptions=false;
	voteData.votes = {};
	update();
});
socket.on('showOptions', function(){
	voteData.showOptions = !voteData.showOptions;
	update();
});
socket.on('vote', function(option){
	console.log("voted "+option);
	if (!voteData.votes[option]) {
		voteData.votes[option]=1;
	} else {
		voteData.votes[option]++;
	}
	update();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});