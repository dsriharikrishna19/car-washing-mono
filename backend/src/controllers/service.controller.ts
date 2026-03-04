import { Request, Response } from 'express';
import * as serviceService from '../services/service.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await serviceService.createCategory(req.body);
    res.status(201).send(category);
});

export const getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await serviceService.getCategories();
    res.send(categories);
});

export const createService = catchAsync(async (req: Request, res: Response) => {
    const service = await serviceService.createService(req.body);
    res.status(201).send(service);
});

export const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const services = await serviceService.getAllServices();
    res.send(services);
});

export const getServicesByCategory = catchAsync(async (req: Request, res: Response) => {
    const services = await serviceService.getServicesByCategory(req.params.categoryId as string);
    res.send(services);
});
