'use strict';



exports.register = function (io) {

    var nps = io.of('<%= namespace %>');
    nps.on('connection', function(socket)
    {
        socket.connectDate = new Date();
        socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

        /* insert your logic */

        socket.on('disconnect', function () {
            console.log('[%s] %s disconnected.', new Date().toUTCString(), socket.ip);
        });

        console.log('[%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);
    });
};
