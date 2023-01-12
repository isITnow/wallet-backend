const User = require('../schemas/user.js');

module.exports = {
    register: async (name, email, password) => {
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
    },

    login: async (email, token) => {
        return await User.findOneAndUpdate({ email }, { token }, { new: true });
    },

    logout: async id => {
        return await User.findByIdAndUpdate(id, { token: null }, { new: true });
    },
};
