import express from 'express';
import { controller } from '../controllers/users.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.post('/register', asyncWrapper(controller.register));

export default router;
