/** *************************************************************
 * Error Handler Middleware
 * - Handles errors that occur during request processing
 * - Sets the response status code based on the error
 * - Returns a JSON response with an error message
 ************************************************************** */
exports.errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({ message: error.message || 'Internal Server Error' });
};
