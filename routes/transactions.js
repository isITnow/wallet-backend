import express from 'express';
import { transactionsControllers } from '../controllers/transactions.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', asyncWrapper(transactionsControllers.createTransaction));
router.get('/', asyncWrapper(transactionsControllers.getAllTransactions));
router.get(
    '/:month/:year',
    asyncWrapper(transactionsControllers.getTransactionsByDate)
);

export default router;
