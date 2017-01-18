const server = require('http').createServer();
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

require('./middleware.js')(app, express, server);

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

module.exports = server;
