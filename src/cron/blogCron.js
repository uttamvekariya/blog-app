import cron from "node-cron";
import Blog from "../models/blogModel.js";
import logger from "../utils/logger.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const deleted = await Blog.deleteMany({});
    logger.info(`Cron: Deleted ${deleted.deletedCount} blog(s) at midnight.`);
  } catch (error) {
    logger.error("Cron Job Failed to delete blogs:", error);
  }
});
