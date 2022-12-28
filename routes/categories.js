import express from 'express';
import { categoriesControllers } from '../controllers/categories.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', categoriesControllers.getCategories);

export default router;
