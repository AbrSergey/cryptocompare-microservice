const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const { errorHandler } = require('./middleware');
const { port } = require('./config').app;

const app = express();

app.use(morgan(('combined')));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening port ${port}`));

module.exports = app;
