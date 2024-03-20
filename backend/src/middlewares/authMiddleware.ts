import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import getDotenv from "../utils/dotenv";

declare module "express" {
    interface Request {
        userId?: string;
    }
}

interface MyJwtPayload {
    userId: string;
}

const authMiddleware = asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
        console.log("Auth Middleware");

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new Error("NoTokenError: Not authorized - no token");
        }

        const token = authHeader.split(" ")[1];
        console.log("Token: ");
        console.log(token);
        try {
            const decoded = jwt.verify(
                token,
                getDotenv("ACCESS_TOKEN_SECRET")
            ) as MyJwtPayload;
            const userId = decoded.userId;
            console.log("UserId: ");
            console.log(userId);
            req.userId = userId;
            next();
        } catch (err: any) {
            if (err.name === "TokenExpiredError") {
                throw new Error("InvalidTokenError: Expired Error");
            }

            throw new Error("Invalid Token");
        }
    }
);

export default authMiddleware;
