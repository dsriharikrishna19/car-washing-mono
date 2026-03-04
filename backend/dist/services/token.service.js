import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export const generateToken = (userId, role, expires, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        role: role,
    };
    return jwt.sign(payload, secret, { expiresIn: expires });
};
export const verifyToken = (token, secret = config.jwt.secret) => {
    return jwt.verify(token, secret);
};
export const generateAuthTokens = async (userId, role) => {
    const accessToken = generateToken(userId, role, `${config.jwt.accessExpirationMinutes}m`);
    const refreshToken = generateToken(userId, role, `${config.jwt.refreshExpirationDays}d`);
    return {
        access: {
            token: accessToken,
            expires: new Date(Date.now() + Number(config.jwt.accessExpirationMinutes) * 60 * 1000),
        },
        refresh: {
            token: refreshToken,
            expires: new Date(Date.now() + Number(config.jwt.refreshExpirationDays) * 24 * 60 * 60 * 1000),
        },
    };
};
