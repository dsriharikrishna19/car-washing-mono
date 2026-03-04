import app from './app.js';
import { config } from './config/config.js';
import prisma from './config/prisma.js';

const startServer = async () => {
    try {
        // Check Database connection
        await prisma.$connect();
        console.log('Connected to the database');

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
            console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();
