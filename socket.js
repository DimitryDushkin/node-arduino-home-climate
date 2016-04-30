

module.exports = function(stateEmitter, io) {
    var state;

    stateEmitter.on('state-change', (newState) => {
        state = newState;
    });

    // on connection of new client
    io.on('connection', function(socket) {
        function sendStateToClient(state) {
            socket.emit('arduino', state);
        }

        if (state) {
            sendStateToClient(state);
        }

        stateEmitter.on('state-change', sendStateToClient);

        socket.on('disconnect', () => {
            stateEmitter.removeListener('state-change', sendStateToClient);
        });
    });



};
