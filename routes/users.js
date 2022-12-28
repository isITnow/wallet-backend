import express from 'express';
import { controller } from '../controllers/users.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validate.user, asyncWrapper(controller.register));
router.post('/login', validate.user, asyncWrapper(controller.login));

router.use(authMiddleware);

router.post('/logout', asyncWrapper(controller.logout));

export default router;
