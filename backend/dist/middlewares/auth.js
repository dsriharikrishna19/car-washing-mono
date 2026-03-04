import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Please authenticate'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, config.jwt.secret);
        req.user = {
            id: payload.sub,
            role: payload.role,
        };
        next();
    }
    catch (error) {
        next(new ApiError(401, 'Please authenticate'));
    }
};
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError(403, 'Forbidden'));
        }
        next();
    };
};
