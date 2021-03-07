const cryptocompare = require('./services/cryptocompare');
const logger = require('./helpers/logger');
const { fsyms, tsyms } = require('./config/index').cryptocompare;
const { Crypto } = require('./models');

/**
  * Fetch data from service every time and send to socket clients.
  * Time set up inside src -> config -> cron -> period
  *
  * @param {Set} clients - array of fsyms
*/
module.exports = async (clients) => {
  try {
    const data = await cryptocompare.fetch({ fsyms, tsyms });
    await Crypto.create({
      data
    });

    clients.forEach((client) => client.send(JSON.stringify(data)));
  }
  catch (err) {
    logger.error(`error inside cron task = ${err}`);
  }
};
