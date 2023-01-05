const User = require('../schemas/user.js');
const jwt = require('jsonwebtoken');
const { register, login, logout } = require('../services/users.js');
const createError = require('../utils/createError.js');
const getActualBalance = require('../utils/getUserActualBalance.js');

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await register(name, email, password);

    if (!user) {
        throw createError(409, 'User with this email already exists');
    }
    res.status(201).json({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

const loginUser = async (req, res, next) => {
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

    const loggedInUser = await login(email, token);

    res.json({
        data: {
            id: loggedInUser._id,
            name: loggedInUser.name,
            email: loggedInUser.email,
            token: token,
        },
    });
};

const logoutUser = async (req, res, next) => {
    const { _id } = req.user;

    const user = await logout(_id);

    // if (!user) {
    //     throw createError(401, 'Not authorized');
    // }
    res.status(204).json({
        message: 'success',
    });
};

const currentUser = async (req, res) => {
    const balance = await getActualBalance(req.user._id);
    res.json({
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            balance,
        },
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
};
