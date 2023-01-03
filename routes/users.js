const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
} = require('../controllers/users.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const { addUserValidation } = require('../middlewares/validationMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', addUserValidation, asyncWrapper(registerUser));
router.post('/login', addUserValidation, asyncWrapper(loginUser));

router.use(authMiddleware);

router.post('/logout', asyncWrapper(logoutUser));

module.exports = { usersRouter: router };
