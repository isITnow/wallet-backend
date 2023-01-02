import { transactionServices } from '../services/transactions.js';
import Transaction from '../schemas/transaction.js';
import { createError } from '../utils/createError.js';

const findLastTransactionRecord = owner => {
    // return Transaction.aggregate([
    //     {
    //         $match: {
    //             owner: id,
    //         },
    //     },
    //     {
    //         $sort: {
    //             createdAt: -1,
    //         },
    //     },
    //     {
    //         $limit: 1,
    //     },
    // ]);
    return Transaction.find({ owner }).sort({ createdAt: -1 }).limit(1);
};

const createTransaction = async (req, res) => {
    const { _id } = req.user;
    const lastRecord = await findLastTransactionRecord(_id);
    const balance = lastRecord[0]?.actualBalance || 0;

    const newTransaction = createNewTransactionObject(req.body, _id, balance);
    const operation = await transactionServices.create(newTransaction, _id);
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

    const { allTransactions, total } = await transactionServices.getAll(
        filters
    );

    // if (!allTransactions) {
    //     createError(400, 'No transactions found');
    // }

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

    const transactions = await transactionServices.getByDate(_id);
};

const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date } = data;

    let actualBalance = type === 'income' ? balance + amount : balance - amount;
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

export const transactionsControllers = {
    createTransaction,
    getAllTransactions,
    getTransactionsByDate,
};
