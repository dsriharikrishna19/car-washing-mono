import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import serviceRoutes from './service.routes.js';
import bookingRoutes from './booking.routes.js';
import paymentRoutes from './payment.routes.js';
import partnerRoutes from './partner.routes.js';
import reviewRoutes from './review.routes.js';
import notificationRoutes from './notification.routes.js';
import adminRoutes from './admin.routes.js';
const router = express.Router();
const routes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/services',
        route: serviceRoutes,
    },
    {
        path: '/bookings',
        route: bookingRoutes,
    },
    {
        path: '/payments',
        route: paymentRoutes,
    },
    {
        path: '/partners',
        route: partnerRoutes,
    },
    {
        path: '/reviews',
        route: reviewRoutes,
    },
    {
        path: '/notifications',
        route: notificationRoutes,
    },
    {
        path: '/admin',
        route: adminRoutes,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
