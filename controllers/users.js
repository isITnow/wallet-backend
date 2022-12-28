import { service } from '../services/users.js';
import { createError } from '../utils/createError.js';

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await service.registerUser(name, email, password);
    console.log('user: ', user);

    if (!user) {
        throw createError(409, 'Email in use');
    }
    console.log('OK');
    res.status(201).json({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

export const controller = {
    register,
};
