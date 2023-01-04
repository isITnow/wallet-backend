const { create, getAll, getByDate } = require('../services/transactions.js');
const createNewTransactionObject = require('../utils/createNewTransactionObject.js');
const getActualBalance = require('../utils/getUserActualBalance.js');
// const Transaction = require('../schemas/transaction.js');
// const createError = require('../utils/createError.js');

const createTransaction = async (req, res) => {
    const { _id } = req.user;
    const balance = await getActualBalance(_id);
    const newTransaction = createNewTransactionObject(req.body, _id, balance);
    const transaction = await create(newTransaction, _id);

    res.status(201).json({
        data: {
            transaction,
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

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionsByDate,
};
