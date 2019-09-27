const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const bodyParse = require('body-parser');
const io = require('socket.io')(server);

// var port = process.env.PORT;
var port = 3000;

app.use(
	bodyParse.urlencoded({
		extended: true
	})
);
app.use(bodyParse.json());


app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

io.on('connection',function(socket){
	console.log(`Socket conectado ${socket.id}`);
	app.get('/login/:user',function(req,res){
		io.emit('login',{user: req.params.user});
		res.send('send');
	});

	socket.on('disconnect',function(){
		console.log(`Socket desconectado ${socket.id}`);
	});
});

server.listen(port,function() {
	console.log("PORTA ABERTA");
})