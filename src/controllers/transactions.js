const {
    create,
    getAll,
    getByDate,
    getDates,
} = require('../services/transactions.js');
const createNewTransactionObject = require('../utils/createNewTransactionObject.js');
const getUserActualBalance = require('../utils/getUserActualBalance.js');
const createError = require('../utils/createError.js');
const updateFurtherBalanceRecords = require('../utils/updateFurtherBalanceRecords.js');

module.exports = {
    createTransaction: async (req, res) => {
        const { _id } = req.user;
        const { amount, date, type } = req.body;

        await updateFurtherBalanceRecords(_id, date, amount, type);

        const balance = await getUserActualBalance(_id, date);
        const newTransaction = createNewTransactionObject(
            req.body,
            _id,
            balance
        );

        if (typeof newTransaction === 'string') {
            throw createError(400, newTransaction);
        }

        const transaction = await create(newTransaction, _id);

        res.status(201).json({
            data: {
                transaction,
            },
        });
    },

    getAllTransactions: async (req, res) => {
        const { _id } = req.user;
        let { limit = 6, page = 1 } = req.query;

        limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
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
    },

    getTransactionsByDate: async (req, res) => {
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
    },

    getTransactionsDates: async (req, res) => {
        const { _id } = req.user;

        const dates = await getDates(_id);
        console.log('dates: ', dates);
        res.status(200).json({
            data: {
                dates,
            },
        });
    },
};
