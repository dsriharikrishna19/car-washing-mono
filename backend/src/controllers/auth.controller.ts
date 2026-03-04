import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import * as tokenService from '../services/token.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    const tokens = await tokenService.generateAuthTokens(user.id, user.role);
    res.status(201).send({ user, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const tokens = await tokenService.generateAuthTokens(user.id, user.role);
    res.send({ user, tokens });
});
