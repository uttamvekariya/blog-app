import { Message } from "../utils/message.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { StatusCodes } from "http-status-codes";

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      logger.error(Message.NO_TOKEN);
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: Message.NO_TOKEN,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(Message.TOKEN_IS_NOT_VALID,error);
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: Message.TOKEN_IS_NOT_VALID,
    });
  }
};