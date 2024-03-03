/** **************************************************************
 * MongoDB Storage Class
 * - Handles database operations for a specific entity
 * - Inherits from EventEmitter for event handling
 * - Connects to MongoDB using Mongoose
 * - Defines methods for CRUD operations
 * - Implements error handling for database operations
 ************************************************************** */
const { EventEmitter } = require('events');
const mongoose = require('mongoose');
const Path = require('path');

module.exports = class MongoStorage extends EventEmitter {
  constructor(entity) {
    super();

    this.entityName = entity.charAt(0).toUpperCase() + entity.slice(1);
    this.Model = require(Path.join(__dirname, `../models/${this.entityName}.model.js`));
    this.connect();
  }

  async connect() {
    try {
      const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
      await mongoose.connect(connectionUrl)
        .then(() => console.log(`connected to ${this.entityName} collection `));
    } catch (error) {
      console.error(`connection error: ${error}`);
      throw new Error('DataBase connection error');
    }
  }

  find() {
    return this.Model.find({});
  }

  findById(_id) {
    return this.Model.find({ _id });
  }

  findByParents(parents) {
    return this.Model.find({ parents });
  }

  create(data) {
    const entity = new this.Model(data);
    entity.save();
  }

  update(_id, data) {
    return this.Model.updateOne({ _id }, data);
  }

  delete(_id) {
    return this.Model.deleteOne({ _id });
  }
};
