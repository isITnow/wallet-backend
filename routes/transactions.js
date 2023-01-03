const express = require('express');
const {
    createTransaction,
    getAllTransactions,
    getTransactionsByDate,
} = require('../controllers/transactions.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);
router.post('/', asyncWrapper(createTransaction));
router.get('/', asyncWrapper(getAllTransactions));
router.get('/:month/:year', asyncWrapper(getTransactionsByDate));

module.exports = { transactionsRouter: router };
