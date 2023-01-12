const User = require('../schemas/user.js');
const jwt = require('jsonwebtoken');
const { register, login, logout } = require('../services/users.js');
const createError = require('../utils/createError.js');
const getUserActualBalance = require('../utils/getUserActualBalance.js');

module.exports = {
    registerUser: async (req, res) => {
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
    },

    loginUser: async (req, res) => {
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
    },

    logoutUser: async (req, res) => {
        const { _id } = req.user;
        await logout(_id);

        res.status(204).json({
            message: 'success',
        });
    },

    currentUser: async (req, res) => {
        const balance = await getUserActualBalance(req.user._id);
        res.json({
            data: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                balance,
                createdAt: req.user.createdAt,
            },
        });
    },
};
