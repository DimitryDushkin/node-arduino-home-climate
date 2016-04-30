'use strict';

const
    EventEmitter = require('events'),
    five = require('johnny-five');

class DataEmitter extends EventEmitter {}

var stateEmitter = new DataEmitter(),
    board = new five.Board({
        repl: false
    }),
    state = {};

board.on('ready', function() {
    console.log('Board ready');

    this.pinMode(2, five.Pin.INPUT);
    this.digitalRead(2, function(presence) {
        state.presence = presence;
        stateEmitter.emit('state-change', state);
    });
});

module.exports = stateEmitter;
