export const errorHandlerMiddleware = (err, req, res, next) => {
  // Joi validation error from express-joi-validation
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.error.details.map(detail => detail.message),
    });
  }

  // Other unexpected or server errors
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong',
  });
};
