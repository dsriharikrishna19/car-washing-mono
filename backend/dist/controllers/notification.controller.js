import * as notificationService from '../services/notification.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';
export const getMyNotifications = catchAsync(async (req, res) => {
    if (!req.user)
        throw new ApiError(401, 'Unauthorized');
    const notifications = await notificationService.getNotifications(req.user.id);
    res.send(notifications);
});
export const markAsRead = catchAsync(async (req, res) => {
    const notification = await notificationService.markAsRead(req.params.notificationId);
    res.send(notification);
});
