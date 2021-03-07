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

    return data;
  }
  catch (err) {
    logger.error(`error from cryptocompare module. err.stack = ${err.stack}`);
    throw new InternalError(err);
  }
};
