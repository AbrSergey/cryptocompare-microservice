const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const { errorHandler } = require('./middleware');
const logger = require('./helpers/logger');
const { port } = require('./config').app;
const { period } = require('./config').cron;
const cronTask = require('./cronTask');
const { clients } = require('./sockets');

// cron task
if (cron.validate(period)) {
  cron.schedule(period, () => {
    cronTask(clients);
  });
}
else {
  logger.error(`invalid period for cron task = "${period}"`);
}

const app = express();

app.use(morgan(('combined')));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/service', router);
app.use(errorHandler);

app.listen(port, () => logger.info(`Server listening port ${port}`));

module.exports = app;
