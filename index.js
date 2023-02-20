import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import logger from './utils/logger.js';
import connectDB from './db/connect.js';

import httpMiddleware from './middleware/morgan.middleware.js';

import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";

const app = express();

const env = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(httpMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({
    message: `Yariga server is running in ${env}`
  });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/properties", propertyRoutes);

const startServer = async () => {
  try {
    connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      if (env === 'development') {
        logger.info(`Server started on http://${HOST}:${PORT}`);
      } else {
        logger.info('Server successfully started');
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

startServer();