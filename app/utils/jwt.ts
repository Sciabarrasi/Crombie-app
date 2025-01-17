import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables.');
}

export const generateToken = (payload: object, expiresIn: string = "1h") => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string) => {
    try { 
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error(error);
        throw new Error("Invalid token");
    }
}