const categories = require('../assets/categories.js');

const checkCategory = category => {
    return categories.some(({ value }) => value === category);
};

module.exports = checkCategory;
