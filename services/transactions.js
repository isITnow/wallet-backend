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

const getTransactions = async ({ owner, limit, skip }) => {
    const total = await Transaction.count({ owner });
    const allTransactions = await Transaction.find({ owner })
        .sort({
            createdAt: -1,
        })
        .select({ __v: 0, owner: 0, updatedAt: 0 })
        .skip(skip)
        .limit(limit);

    // if (!allTransactions) {
    //     return false;
    // }

    return { allTransactions, total };
};

export const transactionServices = {
    createTransaction,
    getTransactions,
};
