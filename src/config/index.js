const config = {
  app: {
    port: 8080,
    socketPort: 8000,
    stage: process.env.NODE_ENV || 'dev'
  },
  cryptocompare: {
    url: 'https://min-api.cryptocompare.com/data/pricemultifull',
    fsyms: ['BTC', 'XRP', 'ETH', 'BCH', 'EOS', 'LTC', 'XMR', 'DASH'],
    tsyms: ['USD', 'EUR', 'GBP', 'JPY', 'RUR']
  },
  cron: {
    period: '*/5 * * * * *' // every five seconds
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
};

Object.keys(config).forEach((type) => {
  Object.keys(config[type]).forEach((prop) => {
    if (!config[type][prop]) {
      throw new Error(`Environment variable error: ${type} -> ${prop} undefined`);
    }
  });
});

module.exports = config;
