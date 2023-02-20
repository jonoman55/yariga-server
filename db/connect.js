import mongoose from 'mongoose';

import logger from '../utils/logger.js';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url).then(
        () => logger.info('MongoDB Connected')
    ).catch(
        (error) => logger.error(error)
    );
};

export default connectDB;