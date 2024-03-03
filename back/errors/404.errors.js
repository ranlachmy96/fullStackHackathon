/** *************************************************************
 * Not Found Error Classes
 * - Define custom error classes for handling 404 (Not Found) errors
 * - Extend the Error class to create custom error objects
 * - Set the status code of the error to 404
 ************************************************************** */
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 404;
  }
}
class EntityNotFound extends NotFound {
  constructor(entity) {
    super(`${entity} not found`);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}
class PropertyNotFound extends NotFound {
  constructor(property) {
    super(`${property} not found`);
    this.name = this.constructor.name;
    this.property = property;
  }
}

module.exports = { PropertyNotFound, EntityNotFound };
