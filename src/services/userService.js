import User from "../models/userModel.js";
import logger from "../utils/logger.js";

export const createUser = async (body) => {
  try {
    const user = new User({ ...body });
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    logger.error('Error creating user:', error);
    throw new Error(error);
  }
};

export const getUser = async (body) => {
  try {
    const user = await User.findOne({ ...body });
    return user;
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw new Error(error);
  }
};
