module.exports = function (server) {
    var module = {};

    const io = require('socket.io')(server);
    io.on('connect', socket => {
        let counter = 0;
        socket.on('player', (data) => {
            console.log(data);
        });
    });

    return module;
};