'use strict';

const
    EventEmitter = require('events'),
    five = require('johnny-five');

class DataEmitter extends EventEmitter {}

var stateEmitter = new DataEmitter(),
    state = {};
    // board = new five.Board({
    //     repl: false
    // });
//
// board.on('ready', function() {
//     console.log('Board ready');
//
//     this.pinMode(2, five.Pin.INPUT); // sensor
//     this.pinMode(3, five.Pin.PWM);  // led
//
//     this.digitalRead(2, function(presence) {
//         state.presence = presence;
//         stateEmitter.emit('state-change', state);
//
//         // Light up on presence
//         if (presence === 1) {
//             this.analogWrite(3, 50);
//         } else {
//             this.analogWrite(3, 0);
//         }
//     });
// });

module.exports = stateEmitter;
