import { transactionServices } from '../services/transactions.js';

const create = async (req, res, next) => {
    const { _id } = req.user;
    await transactionServices.createTransaction(req.body, _id);
    res.json(req.body);
};

export const transactionsControllers = {
    create,
};
