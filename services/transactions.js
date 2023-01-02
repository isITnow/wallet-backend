import Transaction from '../schemas/transaction.js';

const create = async (data, owner) => {
    return Transaction.create({
        ...data,
        owner,
    });
};

const getAll = async ({ owner, limit, skip }) => {
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

const getByDate = async id => {};

export const transactionServices = {
    create,
    getAll,
    getByDate,
};
