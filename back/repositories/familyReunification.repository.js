/** *************************************************************
 * Family Reunification Repository
 * - Initializes database storage based on environment variables
 * - Imports MongoDB storage class for database interactions
 * - Defines methods for CRUD operations
 ************************************************************** */
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
  storage = new MongoStorage('familyReunification');
} else {
  throw new Error('Database connection parameters not provided');
}

// const familyReunificationRepository = {
//   find: () => (storage ? storage.find() : null),
//   findById: (id) => (storage ? storage.findById(id) : null),
//   findByParents: (parents) => (storage ? storage.findByParents(parents) : null),
//   create: (reunificationCase) => (storage ? storage.create(reunificationCase) : null),
//   update: (id, reunificationCase) => (storage ? storage.update(id, reunificationCase) : null),
//   delete: (id) => (storage ? storage.delete(id) : null),
// };

const find = () => (storage ? storage.find() : null);
const findById = (id) => (storage ? storage.findById(id) : null);
const findByParents = (parents) => (storage ? storage.findByParents(parents) : null);
const create = (reunificationCase) => (storage ? storage.create(reunificationCase) : null);
const update = (id, reunificationCase) => (storage ? storage.update(id, reunificationCase) : null);

const deleteById = (id) => (storage ? storage.delete(id) : null);

module.exports = {
  find, findById, findByParents, create, update, deleteById,
};
