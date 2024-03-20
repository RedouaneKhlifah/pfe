import { Router } from "express";
import {
    registerUserHandler,
    loginUserHandler
} from "../controllers/userController";

const router = Router();

/**
 * @POST
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerUserHandler);

/**
 * @POST
 * @desc Login user
 * @access Public
 */
router.post("/login", loginUserHandler);

// /**
//  * @POST
//  * @desc Logout user
//  * @access Private
//  */
// router.post("/logout", logoutUserHandler);

export default router;
