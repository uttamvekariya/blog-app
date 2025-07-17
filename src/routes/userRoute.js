import express from "express";
import { validator } from "../helpers/validator.js";
import { login, register } from "../controllers/userController.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidation.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload, validator.body(registerValidation), register);
router.post("/login", validator.body(loginValidation), login);

export default router;
