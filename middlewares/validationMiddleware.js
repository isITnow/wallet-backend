import Joi from 'joi';

const user = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(1).max(24),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details });
    }
    next();
};

export const validate = {
    user,
};
