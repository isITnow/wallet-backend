import categories from '../assets/categories.js';

const getCategories = (req, res, next) => {
    res.json({
        data: categories,
    });
};

export const categoriesControllers = {
    getCategories,
};
