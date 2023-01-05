const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date, comments = '' } = data;

    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    const tomorrowZeroHours = new Date(tomorrow).setHours(0, 0, 0, 0);
    const isInvalidDate = date >= tomorrowZeroHours;

    if (isInvalidDate) {
        return false;
    }

    let actualBalance =
        type === 'income'
            ? (balance + amount).toFixed(2)
            : (balance - amount).toFixed(2);

    let newTransaction = {
        owner: userId,
        type,
        category,
        amount,
        date,
        actualBalance,
        comments,
    };

    return newTransaction;
};

module.exports = createNewTransactionObject;
