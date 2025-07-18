import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 2 characters",
    "string.max": "Name can have at most 50 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be empty",
    "string.email": "Email should be in a valid format",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#'\'()*+,-./:;<=>?@[\]^_`'])[A-Za-z\d@$!%*?&#'\'()*+,-./:;<=>?@[\]^_`']{8,}$/,
      "password"
    )
    .required()
    .min(8)
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password length must be at least 8 characters.",
      "any.required": `Password is Required`,
      "string.pattern.name":
        "Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
    "string.empty": "Confirm password cannot be empty",
    "any.required": "Confirm password is required",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be empty",
    "string.email": "Email should be in a valid format",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#'\'()*+,-./:;<=>?@[\]^_`'])[A-Za-z\d@$!%*?&#'\'()*+,-./:;<=>?@[\]^_`']{8,}$/,
      "password"
    )
    .required()
    .min(8)
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password length must be at least 8 characters.",
      "any.required": `Password is Required`,
      "string.pattern.name":
        "Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.",
    }),
});
