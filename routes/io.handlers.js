
var db = require('../models');

exports.connection = function(socket) {
    db.Machines.findAll({include: [db.Batiments, db.Boissons]}).success(function(machines){
        socket.emit('updateAll', machines);
    });
};
