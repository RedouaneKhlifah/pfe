import { UserDocument } from "../models/UserModel";

export const userResponse = (user: UserDocument) => {
    const { _id, fullName, email, role } = user;
    return { _id, fullName, email, role };
};
