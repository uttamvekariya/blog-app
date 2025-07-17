import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name can have at most 50 characters',
      'any.required': 'Name is required',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email should be in a valid format',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least 6 characters',
      'string.max': 'Password can have at most 20 characters',
      'any.required': 'Password is required',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'string.empty': 'Confirm password cannot be empty',
      'any.required': 'Confirm password is required',
    }),
});

export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email should be in a valid format',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least 6 characters',
      'string.max': 'Password can have at most 20 characters',
      'any.required': 'Password is required',
    }),
});