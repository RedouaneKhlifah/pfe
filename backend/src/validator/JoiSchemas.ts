import Joi, { ObjectSchema } from "joi";

/**
 * @desc schema that defines custom Error Messages
 **/

interface CustomErrorMessages {
    [key: string]: string;
}
const customErrorMessages: CustomErrorMessages = {
    "string.base": "must be a valid string.",
    "string.pattern.base": "can not contain spaces.",
    "string.min": "must be at least {#limit} characters long.",
    "string.max": "must not exceed {#limit} characters.",
    "string.email": "The email address is not valid.",
    "any.required": "is required.",
    "string.empty": "can not be empty.",
    "number.base": "must be a valid ID."
};

/**
 * @User
 **/

export const RegisterUserSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("player", "admin")
});

export const LoginUserSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("player", "admin").required()
});

/**
 * @Player
 **/

export const PlayerSchema = Joi.object({
    nickName: Joi.string().required(),
    position: Joi.string().required(),
    age: Joi.number().required(),
    location: Joi.string().required(),
    image: Joi.string().uri().required()
});

/**
 * @Team
 **/

export const TeamSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().uri().required()
});

/**
 * @Tournament
 **/

export const TournamentSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required()
});

export const validator = (schema: ObjectSchema, data: object) => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errors: { field: string; message: string }[] = error.details.map(
            (detail) => {
                const field: string | undefined = detail.path
                    ? Array.isArray(detail.path) && detail.path.length > 1
                        ? detail.path[1]?.toString()
                        : detail.path[0]?.toString()
                    : undefined;

                const errorMessage =
                    customErrorMessages[detail.type] || detail.message;

                return {
                    field: field || "",
                    message: field + " " + errorMessage
                };
            }
        );
        return errors;
    }
    return null;
};
