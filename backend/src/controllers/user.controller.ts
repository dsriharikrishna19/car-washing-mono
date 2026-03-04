import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.js';
import * as userService from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const getProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const user = await userService.getUserById(req.user.id);
    res.send(user);
});

export const updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const user = await userService.updateUserById(req.user.id, req.body);
    res.send(user);
});

export const addAddress = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const address = await userService.addAddress(req.user.id, req.body);
    res.status(201).send(address);
});

export const addCar = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const car = await userService.addCar(req.user.id, req.body);
    res.status(201).send(car);
});

export const getAddresses = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const addresses = await userService.getAddresses(req.user.id);
    res.send(addresses);
});

export const getCars = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const cars = await userService.getCars(req.user.id);
    res.send(cars);
});
