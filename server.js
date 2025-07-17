import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/database/db.js';
import logger from './src/utils/logger.js';
import { Message } from './src/utils/message.js';
import { errorHandlerMiddleware } from './src/middlewares/errorhandle.js';
import userRoute from './src/routes/userRoute.js'
import blogRoute from './src/routes/blogRoute.js'
import externalRoute from './src/routes/externalRoute.js'
import './src/cron/blogCron.js';

dotenv.config();

const app = express();
connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(helmet());

app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/external', externalRoute);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`${Message.LISTENING_TO_PORT} :  ${port}`);
});

export default app;
