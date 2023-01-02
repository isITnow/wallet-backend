import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: 'json' };

const swaggerDocument = await import('./swagger.json', {
    assert: { type: 'json' },
});

import usersRouter from './routes/users.js';
import categoriesRouter from './routes/categories.js';
import transactionsRouter from './routes/transactions.js';

dotenv.config();

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

export default app;
