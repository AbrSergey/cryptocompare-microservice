const axios = require('axios');
const queryString = require('query-string');
const logger = require('../helpers/logger');
const contains = require('../helpers/contains');
const { InternalError, InvalidDataError } = require('../errorTypes');
const { cryptocompare } = require('../config');

/**
  * Fetch data from service
  *
  * @param {Array} fsyms - array of fsyms
  * @param {Array} tsyms - array of tsyms
  * @return {Promise} - return data from cryptocompare service
*/
module.exports.fetch = async ({ fsyms, tsyms }) => {
  try {
    if (!contains(fsyms, cryptocompare.fsyms)) {
      throw new InvalidDataError(`fsyms must be one or many from list = ${cryptocompare.fsyms}`);
    }
    if (!contains(tsyms, cryptocompare.tsyms)) {
      throw new InvalidDataError(`tsyms must be one or many from list = ${cryptocompare.tsyms}`);
    }

    const reqUrl = queryString.stringifyUrl({
      url: cryptocompare.url,
      query: {
        fsyms: fsyms.join(','),
        tsyms: tsyms.join(',')
      }
    });

    logger.debug(`Request from cryptocompare by url = ${reqUrl}`);

    const { data } = await axios.get(reqUrl).catch((err) => {
      if (!err.response || !err.response.data) {
        const errData = {
          status: err.code,
          message: err.stack
        };
        logger.error('Response error from cryptocompare', { data: errData });
        throw new InternalError({ data: errData });
      }
      else {
        logger.error('Unexpected response error from cryptocompare');
        throw new InternalError({ data: err.stack });
      }
    });

    if (!data || !data.RAW || !data.DISPLAY) {
      throw new InternalError('response data from cryptocompare not exists');
    }

    let raw = {};
    let display = {};

    fsyms.forEach((fsym) => {
      tsyms.forEach((tsym) => {
        raw = {
          ...raw,
          [fsym]: {
            ...raw[fsym],
            [tsym]: {
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
            }
          }
        };
      });
    });

    fsyms.forEach((fsym) => {
      tsyms.forEach((tsym) => {
        display = {
          ...display,
          [fsym]: {
            ...display[fsym],
            [tsym]: {
              CHANGE24HOUR: data.RAW[fsym][tsym].CHANGE24HOUR,
              CHANGEPCT24HOUR: data.RAW[fsym][tsym].CHANGEPCT24HOUR,
              OPEN24HOUR: data.RAW[fsym][tsym].OPEN24HOUR,
              VOLUME24HOUR: data.RAW[fsym][tsym].VOLUME24HOUR,
              VOLUME24HOURTO: data.RAW[fsym][tsym].VOLUME24HOURTO,
              HIGH24HOUR: data.RAW[fsym][tsym].HIGH24HOUR,
              PRICE: data.RAW[fsym][tsym].PRICE,
              FROMSYMBOL: data.RAW[fsym][tsym].FROMSYMBOL,
              TOSYMBOL: data.RAW[fsym][tsym].TOSYMBOL,
              LASTUPDATE: data.RAW[fsym][tsym].LASTUPDATE,
              SUPPLY: data.RAW[fsym][tsym].SUPPLY,
              MKTCAP: data.RAW[fsym][tsym].MKTCAP
            }
          }
        };
      });
    });

    return {
      RAW: raw,
      DISPLAY: display
    };
  }
  catch (err) {
    logger.error(`error from cryptocompare module. err.stack = ${err.stack}`);
    throw new InternalError(err);
  }
};
