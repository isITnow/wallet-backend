const express = require('express');
const {
    createTransaction,
    getAllTransactions,
    getTransactionsByDate,
    getTransactionsDates,
} = require('../controllers/transactions.js');
const {
    addTransactionValidation,
} = require('../middlewares/validationMiddleware.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);
router.post('/', addTransactionValidation, asyncWrapper(createTransaction));
router.get('/', asyncWrapper(getAllTransactions));
router.get('/:month/:year', asyncWrapper(getTransactionsByDate));
router.get('/dates', asyncWrapper(getTransactionsDates));

module.exports = { transactionsRouter: router };
