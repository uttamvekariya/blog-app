import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUser } from "../services/userService.js";
import logger from "../utils/logger.js";
import { Message } from "../utils/message.js";

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const profileImage = req.file?.path;
  try {
    const existingUser = await getUser({ email });
    if (existingUser) {
      logger.warn(`User ${Message.ALREADY_EXIST} ${email}`);
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `User ${Message.ALREADY_EXIST}`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password: hashedpassword,
      profileImage,
    });

    logger.info(`${Message.REGISTERED_SUCCESSFULLY}`);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: `${Message.REGISTERED_SUCCESSFULLY}`,
      data: user,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} register.`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: `${Message.FAILED_TO} register.`,
      error: error.message || error,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email });

    if (!user) {
      logger.warn(`User ${Message.NOT_FOUND} with email ${email}`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `User ${Message.NOT_FOUND}`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn(Message.INVALID_CREDENTIALS);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: Message.INVALID_CREDENTIALS,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info(Message.USER_LOGGED_IN_SUCCESSFULLY);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: Message.USER_LOGGED_IN_SUCCESSFULLY,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} login.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} login.`,
      error: error.message || error,
    });
  }
};
