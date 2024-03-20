import { accessTokenGenerator } from "../utils/Jwt";
import User, { UserDocument } from "../models/UserModel";
import { IRegisterUser } from "../../types/UserTypes";
import { userResponse } from "../responce/userResponse";
import { checkPasswordCorrcet } from "../utils/Hash";

export const checkUserbyId = async (
    userId: string
): Promise<UserDocument | Error> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const checkIfEmailNotExist = async (email: string): Promise<void> => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User email already exists");
    }
};

const createUser = async (userData: IRegisterUser): Promise<UserDocument> => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
};

// Register new user

const registerUser = async (userData: IRegisterUser) => {
    const { email } = userData;

    await checkIfEmailNotExist(email);
    // Create the new user
    const newUser = await createUser(userData);
    const accessToken = accessTokenGenerator(newUser._id);
    // Return user and access token
    return { user: userResponse(newUser), accessToken };
};

// Login user
const login = async (email: string, password: string): Promise<any> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    await checkPasswordCorrcet(password, user.password);

    // Generate access token
    const accessToken = accessTokenGenerator(user._id);

    // Return user and access token
    return { user: userResponse(user), accessToken };
};

export const userServices = { registerUser, login };
