var express = require('express'),
    path = require('path'),
    routes = require('./routes/index'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    stateEmitter = require('./hardware');

const PORT = process.env.PORT || 3000;

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
require('./socket')(stateEmitter, io);

//append db logging logic
require('./db')(stateEmitter);
