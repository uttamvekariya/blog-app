import Joi from 'joi';

export const blogValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title should be at least 3 characters',
  }),
  content: Joi.string().min(10).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content should be at least 10 characters',
  })
});
