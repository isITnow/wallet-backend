import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const user = new Schema({
    name: {
        typeof: String,
        min: 2,
        max: 35,
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
});

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

export default User;
