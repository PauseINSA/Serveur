
exports.connection = function(socket) {
    socket.emit('update', 'Hello World');
};
