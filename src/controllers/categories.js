const categories = require('../assets/categories.js');

const getCategories = (req, res) => {
    res.json({
        data: categories,
    });
};

module.exports = {
    getCategories,
};
