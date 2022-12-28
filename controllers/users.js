const register = (req, res, next) => {
    res.json(req.body);
};

export const controller = {
    register,
};
