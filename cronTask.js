const cryptocompare = require('./services/cryptocompare');
const logger = require('./helpers/logger');
const { fsyms, tsyms } = require('./config/index').cryptocompare;
const { Crypto } = require('./models');

module.exports = async () => {
  try {
    const data = await cryptocompare.fetch({ fsyms, tsyms });

    const rows = [];

    Object.keys(data.RAW).forEach((fsym) => {
      Object.keys(data.RAW[fsym]).forEach((tsym) => {
        rows.push({
          type: 'RAW',
          fsymCurrency: fsym,
          tsymCurrency: tsym,
          CHANGE24HOUR: data.RAW[fsym][tsym].CHANGE24HOUR,
          CHANGEPCT24HOUR: data.RAW[fsym][tsym].CHANGEPCT24HOUR,
          OPEN24HOUR: data.RAW[fsym][tsym].OPEN24HOUR,
          VOLUME24HOUR: data.RAW[fsym][tsym].VOLUME24HOUR,
          VOLUME24HOURTO: data.RAW[fsym][tsym].VOLUME24HOURTO,
          LOW24HOUR: data.RAW[fsym][tsym].LOW24HOUR,
          HIGH24HOUR: data.RAW[fsym][tsym].HIGH24HOUR,
          PRICE: data.RAW[fsym][tsym].PRICE,
          LASTUPDATE: data.RAW[fsym][tsym].LASTUPDATE,
          SUPPLY: data.RAW[fsym][tsym].SUPPLY,
          MKTCAP: data.RAW[fsym][tsym].MKTCAP
        });
      });
    });

    Object.keys(data.DISPLAY).forEach((fsym) => {
      Object.keys(data.DISPLAY[fsym]).forEach((tsym) => {
        rows.push({
          type: 'DISPLAY',
          fsymCurrency: fsym,
          tsymCurrency: tsym,
          CHANGE24HOUR: data.DISPLAY[fsym][tsym].CHANGE24HOUR,
          CHANGEPCT24HOUR: data.DISPLAY[fsym][tsym].CHANGEPCT24HOUR,
          OPEN24HOUR: data.DISPLAY[fsym][tsym].OPEN24HOUR,
          VOLUME24HOUR: data.DISPLAY[fsym][tsym].VOLUME24HOUR,
          VOLUME24HOURTO: data.DISPLAY[fsym][tsym].VOLUME24HOURTO,
          HIGH24HOUR: data.DISPLAY[fsym][tsym].HIGH24HOUR,
          PRICE: data.DISPLAY[fsym][tsym].PRICE,
          FROMSYMBOL: data.DISPLAY[fsym][tsym].FROMSYMBOL,
          TOSYMBOL: data.DISPLAY[fsym][tsym].TOSYMBOL,
          LASTUPDATE: data.DISPLAY[fsym][tsym].LASTUPDATE,
          SUPPLY: data.DISPLAY[fsym][tsym].SUPPLY,
          MKTCAP: data.DISPLAY[fsym][tsym].MKTCAP
        });
      });
    });

    await Crypto.bulkCreate(rows);
  }
  catch (err) {
    logger.debug(`error inside cron task = ${err}`);
  }
};
