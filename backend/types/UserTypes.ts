export interface IUser extends IRegisterUser {
    _id: string;
}

export interface IRegisterUser {
    fullName: string;
    email: string;
    password: string;
    role: "player" | "admin";
}
