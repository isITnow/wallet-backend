const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date, comments = '' } = data;

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
