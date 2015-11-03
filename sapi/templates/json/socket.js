'use strict';

var <%= objectName %> = require('./<%= fileName %>.controller');

exports.register = function (io) {

    var nps = io.of('<%= namespace %>');
    nps.on('connection', function(socket)
    {
        socket.connectDate = new Date();
        socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

        <%= objectName %>.index(socket);
        <%= objectName %>.show(socket);
        <%= objectName %>.create(socket);
        <%= objectName %>.update(socket);
        <%= objectName %>.destroy(socket);
        /* insert your logic */


        socket.on('disconnect', function () {
            console.log('nps <%= objectName %> [%s] %s disconnected.', new Date().toUTCString(), socket.ip);
        });

        console.log('nps <%= objectName %> [%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);
    });
};