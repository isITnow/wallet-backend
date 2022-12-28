import User from '../schemas/user.js';

const registerUser = async (name, email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        return false;
    }

    const newUser = new User({
        name,
        email,
        password: undefined,
    });
    await newUser.setPassword(password);

    return await User.create(newUser);
};

export const service = {
    registerUser,
};
