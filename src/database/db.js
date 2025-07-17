import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { Message } from '../utils/message.js';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
    logger.info(Message.MONGODB_CONNECTED);
  } catch (error) {
    logger.error(`${Message.MONGODB_CONNECTION_ERROR}`);
    process.exit(1);
  }
};

export default connectDB;
