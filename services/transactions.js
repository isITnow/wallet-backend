const Transaction = require('../schemas/transaction.js');

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

const getByDate = async (owner, month, year) => {
    const transactions = await Transaction.aggregate([
        {
            $match: {
                owner,
                year,
                month,
            },
        },
    ]);

    let incomeSum = null;
    let expenseSum = null;

    if (transactions.length) {
        incomeSum = await aggregateSum(owner, month, year, 'income');
        expenseSum = await aggregateSum(owner, month, year, 'expense');
    }

    return {
        transactions,
        incomeSum,
        expenseSum,
    };
};

const aggregateSum = (owner, month, year, type) => {
    return Transaction.aggregate([
        {
            $match: {
                owner,
                year,
                month,
                type,
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
        },
        {
            $project: {
                _id: 0,
                total: '$total',
            },
        },
    ]);
};

module.exports = {
    create,
    getAll,
    getByDate,
};
