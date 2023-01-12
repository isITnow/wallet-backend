const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
} = require('../controllers/users.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const {
    addUserValidation,
    loginUserValidation,
} = require('../middlewares/validationMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', addUserValidation, asyncWrapper(registerUser));
router.post('/login', loginUserValidation, asyncWrapper(loginUser));

router.use(authMiddleware);

router.post('/logout', asyncWrapper(logoutUser));
router.get('/current', asyncWrapper(currentUser));

module.exports = { usersRouter: router };
