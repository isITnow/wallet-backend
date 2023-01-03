const categories = require('../assets/categories.js');

const getCategories = (req, res, next) => {
    res.json({
        data: categories,
    });
};

module.exports = {
    getCategories,
};
