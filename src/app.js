const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const { usersRouter } = require('./routes/users.js');
const { categoriesRouter } = require('./routes/categories.js');
const { transactionsRouter } = require('./routes/transactions.js');

require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { message = 'Server error', status = 500 } = err;
    res.status(status).json({ message: message });
});

module.exports = app;
