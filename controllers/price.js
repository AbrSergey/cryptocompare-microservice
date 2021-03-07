const cryptocompare = require('../services/cryptocompare');
const { InvalidDataError } = require('../errorTypes');

module.exports.get = async (req, res, next) => {
  try {
    const { fsyms, tsyms } = req.query;

    if (!fsyms) {
      throw new InvalidDataError('require fsyms in query');
    }

    if (!tsyms) {
      throw new InvalidDataError('require tsyms in query');
    }

    const data = await cryptocompare.fetch({
      fsyms: fsyms.split(','),
      tsyms: tsyms.split(',')
    });

    res.status(200).json({ ...data });
  }
  catch (err) {
    next(err);
  }
};
