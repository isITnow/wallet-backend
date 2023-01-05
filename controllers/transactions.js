const { create, getAll, getByDate } = require('../services/transactions.js');
const createNewTransactionObject = require('../utils/createNewTransactionObject.js');
const getActualBalance = require('../utils/getUserActualBalance.js');
const createError = require('../utils/createError.js');
// const Transaction = require('../schemas/transaction.js');

const createTransaction = async (req, res) => {
    const { _id } = req.user;
    const balance = await getActualBalance(_id);
    const newTransaction = createNewTransactionObject(req.body, _id, balance);
    if (!newTransaction) {
        throw createError(
            400,
            'Unavailable to create transaction with future date'
        );
    }
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

    const { transactions, total } = await getAll(filters);

    res.status(200).json({
        data: {
            total,
            page,
            limit,
            transactions,
        },
    });
};

const getTransactionsByDate = async (req, res) => {
    const { _id } = req.user;
    const { month, year } = req.params;

    const today = new Date();
    const nextMonth = today.setMonth(today.getMonth() + 1);

    const isInvalidDate = new Date(year, month).getTime() > nextMonth;

    if (month > 12 || month <= 0 || year.length != 4) {
        throw createError(400, 'Invalid request parameters');
    }

    if (isInvalidDate) {
        throw createError(
            400,
            'Unavailable to get transactions with future date'
        );
    }

    const dateFrom = Date.parse(new Date(year, month - 1));
    const dateTo = Date.parse(new Date(year, month));

    const transactions = await getByDate(_id, dateFrom, dateTo);

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
