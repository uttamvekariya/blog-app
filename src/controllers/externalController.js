import axios from "axios";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger.js";
import { Message } from "../utils/message.js";

export const getUniversities = async (req, res) => {
  try {
    const response = await axios.get(
      "http://universities.hipolabs.com/search?country=India"
    );
    logger.info(`Fetched universities list successfully.`);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Universities fetched successfully.",
      data: response.data,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} fetch universities.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} fetch universities.`,
      error: error.message || error,
    });
  }
};

export const getCatFact = async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    logger.info(`Fetched cat fact successfully`);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Cat fact fetched successfully",
      data: response.data,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} fetch cat fact`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} fetch cat fact`,
      error: error.message || error,
    });
  }
};
