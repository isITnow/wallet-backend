const Transaction = require('../schemas/transaction.js');
const countActualBalance = require('./countActualBalance.js');

const updateFurtherBalanceRecords = async (owner, startDate, amount, type) => {
    const transactions = await Transaction.find({
        owner,
        date: {
            $gt: startDate,
        },
    }).sort({ date: -1 });

    if (!transactions.length) {
        return;
    }

    transactions.forEach(async ({ _id, actualBalance }) => {
        const newActualBalance = countActualBalance(
            amount,
            actualBalance,
            type
        );
        await Transaction.findByIdAndUpdate(
            { _id },
            { actualBalance: newActualBalance }
        );
    });

    return;
};

module.exports = updateFurtherBalanceRecords;
