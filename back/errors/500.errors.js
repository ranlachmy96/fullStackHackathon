/** *************************************************************
 * Server Error Class
 * - Extends the Error class to create custom server error objects
 * - Sets the status code of the error to 500 (Internal Server Error)
 ************************************************************** */
class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
  }
}
module.exports = { ServerError };
