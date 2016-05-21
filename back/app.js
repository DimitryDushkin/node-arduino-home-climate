var express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    stateEmitter = require('./hardware'),
    db = require('./db'),
    compression = require('compression');

const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(__dirname + './../dist'));


app.use('/', routes);

server.listen(PORT, function() {
    console.log('Example app listening at http://%s:%s', 'localhost', PORT);
});

// append socket.io logic
require('./socket')(stateEmitter, io);

//append db logging logic
stateEmitter.on('state-change', (state) => {
    db.savePresence(state.presence);
});
