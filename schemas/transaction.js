import { Schema, model } from 'mongoose';

const transaction = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: Boolean,
        },
        category: {
            type: String,
        },
        amount: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now,
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

export default Transaction;
