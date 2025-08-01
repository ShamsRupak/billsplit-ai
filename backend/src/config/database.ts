import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/billsplit';
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected');
});
