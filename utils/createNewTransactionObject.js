const checkCategory = require('./checkCategory.js');

const createNewTransactionObject = (data, userId, balance) => {
    const { type, category, amount, date, comments = '' } = data;

    const [_, afterDecimal] = amount.toString().split('.');
    const isInvalidAmount = afterDecimal?.length > 2;

    const newCategory = type === 'income' ? 'income' : category.toLowerCase();
    const isAvailableCategory =
        type !== 'income' ? checkCategory(newCategory) : true;

    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    const tomorrowZeroHours = new Date(tomorrow).setHours(0, 0, 0, 0);
    const isInvalidDate = date >= tomorrowZeroHours;

    if (!isAvailableCategory) {
        return `Unavailable category: ${category}`;
    }

    if (isInvalidAmount) {
        return 'Invalid amount';
    }

    if (isInvalidDate) {
        return 'Unavailable to create transaction with future date';
    }

    let actualBalance =
        type === 'income'
            ? (balance + amount).toFixed(2)
            : (balance - amount).toFixed(2);

    let newTransaction = {
        owner: userId,
        type,
        category: newCategory,
        amount,
        date,
        actualBalance,
        comments,
    };

    return newTransaction;
};

module.exports = createNewTransactionObject;
