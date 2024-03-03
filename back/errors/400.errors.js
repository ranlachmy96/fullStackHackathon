/** *************************************************************
 * Bad Request Error Classes
 * - Define custom error classes for handling 400 (Bad Request) errors
 * - Extend the Error class to create custom error objects
 * - Set the status code of the error to 400
 ************************************************************** */
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}
class PropertyExists extends BadRequest {
  constructor(property) {
    super(`${property} all ready exists`);
    this.name = this.constructor.name;
    this.property = property;
  }
}
class BodyNotSent extends BadRequest {
  constructor() {
    super('no properties sent');
    this.name = this.constructor.name;
  }
}
module.exports = { PropertyExists, BodyNotSent };
