import express from "express";
import { validator } from "../helpers/validator.js";
import { upload } from "../middlewares/multer.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogByIdController,
  getBlogController,
  updateBlogController,
} from "../controllers/blogController.js";
import { authenticate } from "../middlewares/auth.js";
import { blogValidation } from "../validations/blogValidation.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  upload,
  validator.body(blogValidation),
  createBlogController
);
router.get("/", authenticate, getBlogController);
router.get("/:id", authenticate, getBlogByIdController);
router.put("/:id", authenticate, upload, updateBlogController);
router.delete("/:id", authenticate, deleteBlogController);

export default router;
