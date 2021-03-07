const WebSocket = require('ws');
const logger = require('./helpers/logger');
const { socketPort } = require('./config').app;

// sockets
const webSocketServer = new WebSocket.Server({ port: socketPort });
logger.info(`Server listening sockets on port ${socketPort}`);

webSocketServer.on('connection', (ws) => {
  ws.send('Hi there, I am a WebSocket server.I will send you new data cryptocompare service every 5 seconds');

  ws.on('error', (e) => ws.send(e));
});

module.exports.clients = webSocketServer.clients;
