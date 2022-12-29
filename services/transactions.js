import Transaction from '../schemas/transaction.js';

const createTransaction = async ({ type, category, amount, date }, owner) => {
    return Transaction.create({ type, category, amount, date, owner });
};

export const transactionServices = {
    createTransaction,
};
