import * as adminService from '../services/admin.service.js';
import { catchAsync } from '../utils/catchAsync.js';
export const getStats = catchAsync(async (req, res) => {
    const stats = await adminService.getDashboardStats();
    res.send(stats);
});
export const getAllUsers = catchAsync(async (req, res) => {
    const users = await adminService.getAllUsers(req.query);
    res.send(users);
});
export const updateUserRole = catchAsync(async (req, res) => {
    const { userId } = req.params;
    if (typeof userId !== 'string') {
        throw new Error('User ID must be a string');
    }
    const user = await adminService.updateUserRole(userId, req.body.role);
    res.send(user);
});
