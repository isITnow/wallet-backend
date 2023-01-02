import express from 'express';
import { transactionsControllers } from '../controllers/transactions.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', asyncWrapper(transactionsControllers.create));
router.get('/', asyncWrapper(transactionsControllers.getAllTransactions));

export default router;
