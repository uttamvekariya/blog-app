import Blog from "../models/blogModel.js";
import logger from "../utils/logger.js";

export const createBlog = async (body) => {
  try {
    return await Blog.create({...body });
  } catch (error) {
    logger.error('Error creating blog:', error);
    throw new Error(error);
  }
};

export const getBlog = async () => {
  try {
    return await Blog.find(); // if need ==>> .populate('author', 'name email') 
  } catch (error) {
    logger.error('Error fetching blog:', error);
    throw new Error(error);
  }
};

export const getBlogById = async (id) => {
  try {
    return await Blog.findById(id);   //    ==>> .populate("author", "name email");
  } catch (error) {
    logger.error("Error fetching blog by ID:", error);
    throw new Error(error);
  }
};

export const updateBlog = async (id, updateBody) => {
  try {
    return await Blog.findByIdAndUpdate(id, updateBody, { new: true });
  } catch (error) {
    logger.error("Error updating blog:", error);
    throw new Error(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    return await Blog.findByIdAndDelete(id);
  } catch (error) {
    logger.error("Error deleting blog:", error);
    throw new Error(error);
  }
};