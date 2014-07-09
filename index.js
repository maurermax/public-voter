//////////////////////////////////////////////////////////////////////////
// Copyright (c) 2014, Max-Emanuel Maurer <maxemanuel.maurer@gmail.com> //
//////////////////////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});

app.get('/report', function(req, res){
  res.sendfile('templates/report.html');
});

app.get('/admin', function(req, res){
  res.sendfile('templates/admin.html');
});

var voteData = {question:"Question",options:["Option 1","Option 2"],votes:{},showOptions:false};

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