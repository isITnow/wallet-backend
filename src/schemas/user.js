const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema(
    {
        name: {
            type: String,
            min: 2,
            max: 24,
            required: [true, 'User name is required'],
            default: 'Guest',
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        token: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

user.methods.setPassword = async function (password) {
    this.password = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT)
    );
};

user.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('users', user);

module.exports = User;
