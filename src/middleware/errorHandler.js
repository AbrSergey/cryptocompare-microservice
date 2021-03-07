const { stage } = require('../config').app;
const logger = require('../helpers/logger');

module.exports = async (err, req, res, next) => {
  try {
    logger.error(`error inside errorHandler = ${err}`);

    res.status(500).json({
      error: err.type || 'Server error',
      description: err.message,
      stack: stage === 'dev' ? err.stack : undefined
    });
  }
  catch (error) {
    logger.error(`unexpected error inside errorHandler = ${error.stack}`);
  }
};
