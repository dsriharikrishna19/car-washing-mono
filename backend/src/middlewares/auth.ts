import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Please authenticate'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, config.jwt.secret) as { sub: string; role: string };
        req.user = {
            id: payload.sub,
            role: payload.role,
        };
        next();
    } catch (error) {
        next(new ApiError(401, 'Please authenticate'));
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError(403, 'Forbidden'));
        }
        next();
    };
};
