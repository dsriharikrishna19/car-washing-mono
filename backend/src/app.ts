import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config/config.js';
import routes from './routes/index.js';

import { authLimiter, apiLimiter } from './middlewares/rateLimit.js';

const app: Express = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use('/v1', apiLimiter);
app.use('/v1/auth', authLimiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Washing Platform API',
            version: '1.0.0',
            description: 'API documentation for the car washing service platform',
        },
        servers: [
            {
                url: `http://localhost:${config.port}/v1`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// v1 api routes
app.use('/v1', routes);

// Root Route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Car Washing Platform API' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});

export default app;
