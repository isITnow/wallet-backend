const { Schema, model } = require('mongoose');

const transaction = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: [true, 'transaction type is required'],
        },
        category: {
            type: String,
        },
        amount: {
            type: Number,
            required: [true, 'amount is required'],
        },
        date: {
            type: Number,
            required: [true, 'transaction date is required'],
        },
        actualBalance: {
            type: Number,
        },
        comments: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = model('transactions', transaction);

module.exports = Transaction;
