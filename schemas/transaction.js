import { Schema, model } from 'mongoose';

const transaction = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
        },
        category: {
            type: String,
        },
        amount: {
            type: Number,
        },
        // date: {
        //     type: Date,
        //     default: Date.now,
        // },

        month: { type: String },
        year: { type: String },
        date: { type: String },
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

export default Transaction;
