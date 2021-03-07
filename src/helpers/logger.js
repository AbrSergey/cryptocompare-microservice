const winston = require('winston');
const { stage } = require('../config').app;

const logger = winston.createLogger({
  level: stage === 'dev' || stage === 'local' ? 'silly' : 'error',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        // winston.format.align(),
        winston.format.printf(
          ({ timestamp, level, message }) => `${timestamp} ${level}: ${
            typeof message === 'object'
              ? JSON.stringify(message, null, 2)
              : message
          }`
        )
      )
    })
  ]
});

module.exports = logger;
