import jwt from 'jsonwebtoken';
import User from '../schemas/user';
import { createError } from '../utils/createError';

export const authMiddleware = async (req, res, next) => {
    if (!req.headers['authorization']) {
        throw createError(401, 'Please, provide Bearer token');
    }

    const [type, token] = req.headers['authorization'].split(' ');

    if (!type === 'Bearer') {
        throw createError(
            401,
            'Invalid authorization type. "Bearer" is required.'
        );
    }

    if (!token) {
        throw createError(401, 'Please, provide token');
    }

    try {
        const SECRET = process.env.JWT_SECRET;
        const checkUser = jwt.verify(token, SECRET);

        if (!checkUser) {
            throw createError(401, 'Not authorized');
        }

        const user = await User.findById(checkUser._id);
        const isSameToken = token === user.token;

        if (!user || !isSameToken) {
            throw createError(401, 'Not authorized');
        }

        req.token = token;
        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
