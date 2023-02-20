import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

import logger from '../utils/logger.js';

const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

const loggerStream = {
    write: (message) => {
        logger.http(message.replace(/\n$/, ''));
    }
};

const httpLogger = morgan(
    isDevelopment ? 'tiny' : 'combined',
    { stream: loggerStream, skip: () => !isDevelopment }
);

export default httpLogger;