const jwt = require('jsonwebtoken');
const User = require('../schemas/user.js');

const authMiddleware = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({
            message: 'Please, provide Bearer token',
        });
    }

    const [type, token] = req.headers['authorization'].split(' ');

    if (!type === 'Bearer') {
        return res.status(401).json({
            message: 'Invalid authorization type. "Bearer" is required.',
        });
    }

    if (!token) {
        return res.status(401).json({
            message: 'Please, provide Bearer token',
        });
    }

    try {
        const SECRET = process.env.JWT_SECRET;
        const checkUser = jwt.verify(token, SECRET);

        if (!checkUser) {
            return res.status(401).json({
                message: 'User is not authorized',
            });
        }

        const user = await User.findById(checkUser._id);
        const isSameToken = token === user?.token;

        if (!user || !isSameToken) {
            return res.status(401).json({
                message: 'User is not authorized',
            });
        }

        req.token = token;
        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = authMiddleware;
