import Transaction from '../schemas/transaction.js';

const createTransaction = async () => {
    return Transaction.create();
};

export const transactionServices = {
    createTransaction,
};
