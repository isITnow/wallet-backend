const User = require('../schemas/user.js');

const register = async (name, email, password) => {
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

const login = async (email, token) => {
    return await User.findOneAndUpdate({ email }, { token }, { new: true });
};

const logout = async id => {
    // const user = await User.findById(id);

    // if (!user) {
    //     return false;
    // }
    return await User.findByIdAndUpdate(id, { token: null }, { new: true });
};

module.exports = {
    register,
    login,
    logout,
};
