import Transaction from '../schemas/transaction.js';

const createTransaction = async (
    { type, category, amount, date, actualBalance },
    owner
) => {
    return Transaction.create({
        type,
        category,
        amount,
        date,
        owner,
        actualBalance,
    });
};

export const transactionServices = {
    createTransaction,
};
