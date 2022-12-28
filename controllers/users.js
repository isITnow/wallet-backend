import User from '../schemas/user.js';
import jwt from 'jsonwebtoken';
import { service } from '../services/users.js';
import { createError } from '../utils/createError.js';

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await service.registerUser(name, email, password);

    if (!user) {
        throw createError(409, 'Email in use');
    }
    res.status(201).json({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, 'password');

    if (!user) {
        throw createError(404, 'User not found');
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
        throw createError(401, 'Email or password is wrong');
    }

    const payload = {
        _id: user._id,
    };
    const SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(payload, SECRET);

    const loggedInUser = await service.loginUser(email, token);

    res.json({
        data: {
            name: loggedInUser.name,
            email: loggedInUser.email,
            token: token,
        },
    });
};

export const controller = {
    register,
    login,
};
