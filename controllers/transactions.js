import { transactionServices } from '../services/transactions.js';

const create = async (req, res, next) => {
    const { _id } = req.user;
    const operation = await transactionServices.createTransaction(
        req.body,
        _id
    );
    res.status(201).json({
        data: {
            operation,
        },
    });
};

export const transactionsControllers = {
    create,
};
