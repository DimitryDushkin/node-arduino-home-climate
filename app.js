var express = require('express');
var path = require('path');
var routes = require('./routes/index');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

server.listen(PORT, function() {
    console.log('Example app listening at http://%s:%s', 'localhost', PORT);
});

// append socket.io logic
require('./socket')(io);
