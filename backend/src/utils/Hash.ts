import bcrypt from "bcrypt";

export async function hasher(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const checkPasswordCorrcet = async (
    password: string,
    userPassword: string
): Promise<void | Error> => {
    const match = await bcrypt.compare(password, userPassword);
    if (!match) {
        throw new Error("Password not matched");
    }
};
