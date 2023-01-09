const Joi = require('joi');

module.exports = {
    addUserValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(1).max(12).required(),
            email: Joi.string()
                .pattern(
                    new RegExp(
                        '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$'
                    )
                )
                .required(),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$'
                    )
                )
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
                .pattern(
                    new RegExp(
                        '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$'
                    )
                )
                .required(),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$'
                    )
                )
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
            // TODO: add date validation (date format)

            date: Joi.date().required(),
            amount: Joi.number().required(),
            type: Joi.any().valid('income', 'expense').required(),
            category: Joi.string(),
            comments: Joi.string().max(15),
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
