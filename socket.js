var SerialPort = require('serialport');
var serialPort = new SerialPort.SerialPort('/dev/cu.usbmodem1421', {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
});


// list ports
//var serialPort = require("serialport");
//serialPort.list(function (err, ports) {
//    ports.forEach(function(port) {
//        console.log(port.comName);
//        console.log(port.pnpId);
//        console.log(port.manufacturer);
//    });
//});

module.exports = function(io) {
    var serialReadyPromise = new Promise(function(resolve, reject) {
            serialPort.on('open', resolve);
        }),
        lastData;

    io.on('connection', function(socket) {
        serialReadyPromise.then(function() {
            if (lastData) {
                sendDataToClient(socket, lastData);
            }

            serialPort.on('data', function(data) {
                lastData = data;
                sendDataToClient(socket, data);
            });
        });
    });

}

function sendDataToClient(socket, data) {
    socket.emit('arduino', data);
}
