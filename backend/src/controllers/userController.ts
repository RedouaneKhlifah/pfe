import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import { IUser } from "../../types/UserTypes";
import {
    LoginUserSchema,
    RegisterUserSchema,
    validator
} from "../validator/JoiSchemas";
import { userServices } from "../services/userServices";

const registerUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, fullName, password, role } = req.body;
        const userData = { email, fullName, password, role };

        const validationErrors = validator(RegisterUserSchema, userData);
        if (validationErrors) {
            res.status(400).json({ errors: validationErrors });
            return;
        }

        const { user, accessToken } = await userServices.registerUser(userData);
        res.status(201).json({ user, accessToken });
    }
);

export const loginUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userData = { email, password };

        const validationErrors = validator(LoginUserSchema, userData);
        if (validationErrors) {
            res.status(400).json({ errors: validationErrors });
            return;
        }

        const { user, accessToken } = await userServices.login(email, password);
        res.status(201).json({ user, accessToken });
    }
);

export { registerUserHandler };
