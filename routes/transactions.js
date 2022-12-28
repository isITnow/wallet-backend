import express from 'express';
import { transactionsControllers } from '../controllers/transactions.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', transactionsControllers.create);

export default router;
