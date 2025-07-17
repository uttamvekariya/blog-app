import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger.js";
import { Message } from "../utils/message.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogById,
  updateBlog,
} from "../services/blogService.js";

export const createBlogController = async (req, res) => {
  try {
    const image = req.file?.path;
    const { title, content } = req.body;

    const blog = await createBlog({
      title,
      content,
      author: req.user.id,
      image,
    });

    logger.info(`Blog created: ${blog._id}`);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} create blog.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} create blog.`,
      error: error.message || error,
    });
  }
};

export const getBlogController = async (req, res) => {
  try {
    const blog = await getBlog();
    logger.info(`All blog ${Message.FETCH_SUCCESSFULLY}`);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: `All blog ${Message.FETCH_SUCCESSFULLY}`,
      data: blog,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} create blog.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} create blog.`,
      error: error.message || error,
    });
  }
};

export const getBlogByIdController = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) {
      logger.warn(`Blog ${Message.NOT_FOUND}`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Blog ${Message.NOT_FOUND}`,
      });
    }

    logger.info(`Blog ${Message.FETCH_SUCCESSFULLY}`);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Blog ${Message.FETCH_SUCCESSFULLY}`,
      data: blog,
    });
  } catch (error) {
    logger.error(` ${Message.FAILED_TO} fetch blog by ID.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} fetch blog.`,
      error: error.message || error,
    });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file?.path;
    const { title, content } = req.body;
    const updateData = {
      image,
      title,
      content,
    };

    const updatedBlog = await updateBlog(id, updateData);

    if (!updatedBlog) {
      logger.warn(`Blog ${Message.NOT_FOUND}`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Blog ${Message.NOT_FOUND}`,
      });
    }

    logger.info(`Blog ${Message.UPDATED_SUCCESSFULLY}`);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Blog ${Message.UPDATED_SUCCESSFULLY}`,
      data: updatedBlog,
    });
  } catch (error) {
    logger.error(` ${Message.FAILED_TO} update blog.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} update blog.`,
      error: error.message || error,
    });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const blog = await deleteBlog(req.params.id);

    if (!blog) {
      logger.warn(
        `Blog ${Message.NOT_FOUND} for deletion. ID: ${req.params.id}`
      );
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Blog ${Message.NOT_FOUND}`,
      });
    }

    logger.info(`Blog ${Message.DELETED_SUCCESSFULLY} ID: ${req.params.id}`);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Blog ${Message.DELETED_SUCCESSFULLY}`,
    });
  } catch (error) {
    logger.error(`${Message.FAILED_TO} delete blog.`, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${Message.FAILED_TO} delete blog.`,
      error: error.message || error,
    });
  }
};
