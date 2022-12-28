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

const loginUser = async (email, token) => {
    return await User.findOneAndUpdate({ email }, { token }, { new: true });
};

const logoutUser = async id => {
    // const user = await User.findById(id);

    // if (!user) {
    //     return false;
    // }
    return await User.findByIdAndUpdate(id, { token: null }, { new: true });
};

export const service = {
    registerUser,
    loginUser,
    logoutUser,
};
