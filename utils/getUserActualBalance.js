const Transaction = require('../schemas/transaction.js');

const getActualBalance = async owner => {
    const lastRecord = await Transaction.find({ owner })
        .sort({ createdAt: -1 })
        .limit(1);
    const balance = lastRecord[0]?.actualBalance || 0;
    return balance;
};

module.exports = getActualBalance;
