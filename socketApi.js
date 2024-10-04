/* 
Auteur: Charles Leroux
Date: 10/04/2024
Fichier: socketApi.js
Description: Fichier pour l'utilisation de socket.io avec express-generator
*/
var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function (socket) {
    console.log('A user is connected!');
})

socketApi.sendNotification = function () {
    io.sockets.emit('hello', { msg: 'Hello World!' });
}

module.exports = socketApi;