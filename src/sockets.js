const WebSocket = require('ws');
const logger = require('./helpers/logger');
const { socketPort } = require('./config').app;

// sockets
const webSocketServer = new WebSocket.Server({ port: socketPort });
logger.info(`Server listening sockets on port ${socketPort}`);

webSocketServer.on('connection', (ws) => {
  logger.info('new socket connection');

  ws.send('Hi there, I am a WebSocket server.');
  ws.send('I will send you updated data from cryptocompare every times when i fetched it.');
  ws.on('error', (e) => ws.send(e));
});

module.exports.clients = webSocketServer.clients;
