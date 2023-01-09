const Transaction = require('../schemas/transaction.js');

const create = async (data, owner) => {
    return Transaction.create({
        ...data,
        owner,
    });
};

const getAll = async ({ owner, limit, skip }) => {
    const total = await Transaction.count({ owner });
    const transactions = await Transaction.find({ owner })
        .sort({
            date: -1,
            createdAt: -1,
        })
        .select({ __v: 0, owner: 0, updatedAt: 0 })
        .skip(skip)
        .limit(limit);

    return { transactions, total };
};

const getByDate = async (owner, from, to) => {
    const transactions = await Transaction.find({
        owner,
        date: { $gte: from, $lt: to },
    })
        .sort({
            createdAt: -1,
        })
        .select({ __v: 0, owner: 0, updatedAt: 0 });

    let incomeSum = null;
    let expenseSum = null;

    if (transactions.length) {
        const getSumNumber = arr => {
            return arr[0]?.total.toFixed(2) || 0;
        };
        income = await aggregateSum(owner, from, to, 'income');
        incomeSum = getSumNumber(income);
        expense = await aggregateSum(owner, from, to, 'expense');
        expenseSum = getSumNumber(expense);
    }

    return {
        incomeSum,
        expenseSum,
        transactions,
    };
};

const aggregateSum = (owner, from, to, type) => {
    return Transaction.aggregate([
        {
            $match: {
                owner,
                date: { $gte: from, $lt: to },
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
