const express = require('express');
const { getCategories } = require('../controllers/categories.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getCategories);

module.exports = { categoriesRouter: router };
