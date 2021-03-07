const cryptocompare = require('./services/cryptocompare');
const logger = require('./helpers/logger');
const { fsyms, tsyms } = require('./config/index').cryptocompare;
const { Crypto } = require('./models');

module.exports = async () => {
  try {
    const data = await cryptocompare.fetch({ fsyms, tsyms });
    await Crypto.create({
      data
    });
  }
  catch (err) {
    logger.debug(`error inside cron task = ${err}`);
  }
};
