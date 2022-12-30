import { transactionServices } from '../services/transactions.js';
import Transaction from '../schemas/transaction.js';

const findLastTransactionRecord = id => {
    return Transaction.aggregate([
        {
            $match: {
                owner: id,
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $limit: 1,
        },
    ]);
};

const create = async (req, res) => {
    const { _id } = req.user;
    const lastRecord = await findLastTransactionRecord(_id);
    const balance = lastRecord[0]?.actualBalance || 0;

    const newTransaction = createNewTransactionObject(req.body, _id, balance);
    const operation = await transactionServices.createTransaction(
        newTransaction,
        _id
    );
    res.status(201).json({
        data: {
            operation,
        },
    });
};

const createNewTransactionObject = (data, userId, balance) => {
    const { type, category = 'income', amount, date = new Date() } = data;

    let actualBalance = type === 'income' ? balance + amount : balance - amount;

    let newTransaction = {
        owner: userId,
        type,
        category,
        amount,
        date,
        actualBalance,
    };

    return newTransaction;
};

export const transactionsControllers = {
    create,
};
