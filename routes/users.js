import express from 'express';
import { userControllers } from '../controllers/users.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validate.user, asyncWrapper(userControllers.register));
router.post('/login', validate.user, asyncWrapper(userControllers.login));

router.use(authMiddleware);

router.post('/logout', asyncWrapper(userControllers.logout));

export default router;
