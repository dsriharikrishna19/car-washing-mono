import * as serviceService from '../services/service.service.js';
import { catchAsync } from '../utils/catchAsync.js';
export const createCategory = catchAsync(async (req, res) => {
    const category = await serviceService.createCategory(req.body);
    res.status(201).send(category);
});
export const getCategories = catchAsync(async (req, res) => {
    const categories = await serviceService.getCategories();
    res.send(categories);
});
export const createService = catchAsync(async (req, res) => {
    const service = await serviceService.createService(req.body);
    res.status(201).send(service);
});
export const getAllServices = catchAsync(async (req, res) => {
    const services = await serviceService.getAllServices();
    res.send(services);
});
export const getServicesByCategory = catchAsync(async (req, res) => {
    const services = await serviceService.getServicesByCategory(req.params.categoryId);
    res.send(services);
});
