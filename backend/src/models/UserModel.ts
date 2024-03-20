import mongoose, { Document } from "mongoose";
import { IUser } from "../../types/UserTypes";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please fill the fullName"]
    },
    email: {
        type: String,
        required: [true, "Please fill the email"]
    },
    password: {
        type: String,
        required: [true, "Please fill the password"]
    },
    role: {
        type: String,
        enum: ["player", "admin"],
        default: "player"
    }
});

export interface UserDocument extends Document, Omit<IUser, "_id"> {}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
