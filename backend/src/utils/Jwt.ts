import jwt from "jsonwebtoken";

// generate a token from the signature jwt_secret
export const accessTokenGenerator = (id: string) => {
    const token = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1h"
    });
    return token;
};
