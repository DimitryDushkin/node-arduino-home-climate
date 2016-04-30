function sendStateToClient(socket, state) {
    socket.emit('arduino', state);
}

module.exports = function(stateEmitter, io) {
    var state;

    stateEmitter.on('state-change', (newState) => {
        state = newState;
    });

    // on connection of new client
    io.on('connection', function(socket) {
        if (state) {
            sendStateToClient(socket, state);
        }

        stateEmitter.on('state-change', (state) => {
            sendStateToClient(socket, state);
        });

        socket.on('disconnect', () => {
            stateEmitter.removeListener('state-change', sendStateToClient);
        });
    });

};
