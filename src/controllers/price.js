const { InvalidDataError, InternalError } = require('../errorTypes');
const contains = require('../helpers/contains');
const { cryptocompare } = require('../config/index');
const { Crypto } = require('../models');

module.exports.get = async (req, res, next) => {
  try {
    const fsyms = req.query.fsyms ? req.query.fsyms.split(',') : [];
    const tsyms = req.query.tsyms ? req.query.tsyms.split(',') : [];

    if (!fsyms.length) {
      throw new InvalidDataError('require fsyms in query');
    }

    if (!tsyms.length) {
      throw new InvalidDataError('require tsyms in query');
    }

    if (!contains(fsyms, cryptocompare.fsyms)) {
      throw new InvalidDataError(`fsyms must be one or many from list = ${cryptocompare.fsyms}`);
    }
    if (!contains(tsyms, cryptocompare.tsyms)) {
      throw new InvalidDataError(`tsyms must be one or many from list = ${cryptocompare.tsyms}`);
    }

    /*
      uncomment next lines if you want to fetch info from url (not from database)
    */
    // const data = await cryptocompare.fetch({
    //   fsyms,
    //   tsyms
    // });

    const { data } = await Crypto.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!data) {
      throw new InternalError('data from database undefined');
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
            }
          }
        };
      });
    });

    res.status(200).json({
      RAW: raw,
      DISPLAY: display
    });
  }
  catch (err) {
    next(err);
  }
};
