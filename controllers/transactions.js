const { create, getAll, getByDate } = require('../services/transactions.js');
const Transaction = require('../schemas/transaction.js');
// const createError = require('../utils/createError.js');

const createTransaction = async (req, res) => {
    const { _id } = req.user;
    // const lastRecord = await findLastTransactionRecord(_id);
    // const balance = lastRecord[0]?.actualBalance || 0;

    const balance = await getActualBalance(_id);

    const newTransaction = createNewTransactionObject(req.body, _id, balance);
    const operation = await create(newTransaction, _id);

    res.status(201).json({
        data: {
            operation,
        },
    });
};

const getAllTransactions = async (req, res) => {
    const { _id } = req.user;
    let { limit = 5, page = 1 } = req.query;

    limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
    page = parseInt(page) < 1 ? 1 : parseInt(page);

    let skip = (page - 1) * limit;
    let filters = { skip, limit, owner: _id };

    const { allTransactions, total } = await getAll(filters);

    res.status(200).json({
        data: {
            total,
            page,
            limit,
            allTransactions,
        },
    });
};

const getTransactionsByDate = async (req, res) => {
    const { _id } = req.user;
    const { month, year } = req.params;
    const transactions = await getByDate(_id, month, year);

    res.status(200).json({
        data: {
            ...transactions,
        },
    });
};

// const findLastTransactionRecord = owner => {
//     return Transaction.find({ owner }).sort({ createdAt: -1 }).limit(1);
// };

const getActualBalance = async owner => {
    const lastRecord = await Transaction.find({ owner })
        .sort({ createdAt: -1 })
        .limit(1);
    const balance = lastRecord[0]?.actualBalance || 0;
    return balance;
};

const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date } = data;

    let actualBalance =
        type === 'income'
            ? (balance + amount).toFixed(2)
            : (balance - amount).toFixed(2);

    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    let newTransaction = {
        owner: userId,
        type,
        category,
        amount,
        date,
        month,
        year,
        actualBalance,
    };

    return newTransaction;
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionsByDate,
};
