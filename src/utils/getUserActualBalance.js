const Transaction = require('../schemas/transaction.js');

const getUserActualBalance = async (owner, dateTo = Date.now()) => {
    const lastRecord = await Transaction.find({
        owner,
        date: {
            $lte: dateTo,
        },
    })
        .sort({
            date: -1,
            createdAt: -1,
        })
        .limit(1);

    const balance = lastRecord[0]?.actualBalance || 0;

    return balance;
};

module.exports = getUserActualBalance;
