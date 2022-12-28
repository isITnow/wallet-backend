import express from 'express';
import { controller } from '../controllers/users.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate.user, asyncWrapper(controller.register));

export default router;
