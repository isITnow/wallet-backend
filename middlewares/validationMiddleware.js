const Joi = require('joi');

module.exports = {
    addUserValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().alphanum().min(2).max(24).required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] },
                })
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
    },

    loginUserValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] },
                })
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
    },

    addTransactionValidation: (req, res, next) => {
        const schema = Joi.object({
            // TODO: add date validation

            // date: Joi.date().format('YYYY-MM-DD').required(),
            amount: Joi.number().required(),
            type: Joi.any().valid('income', 'expense').required(),
            category: Joi.string(),
        });
        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            return res
                .status(400)
                .json({ message: validationResult.error.details });
        }
        next();
    },
};
