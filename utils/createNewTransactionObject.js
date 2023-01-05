const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date, comments = '' } = data;

    let actualBalance =
        type === 'income'
            ? (balance + amount).toFixed(2)
            : (balance - amount).toFixed(2);

    // const month = new Date(date).getMonth() + 1;
    // const year = new Date(date).getFullYear();

    let newTransaction = {
        owner: userId,
        type,
        category,
        amount,
        date,
        // month,
        // year,
        actualBalance,
        comments,
    };

    return newTransaction;
};

module.exports = createNewTransactionObject;
