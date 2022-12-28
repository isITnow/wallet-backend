const create = (req, res, next) => {
    res.json(req.body);
};

export const transactionsControllers = {
    create,
};
