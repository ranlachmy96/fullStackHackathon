
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
    storage = new MongoStorage('WeatherUpdate');
} else {
    throw new Error('Database connection parameters not provided');
}

const find = () => (storage ? storage.find() : null);
const findById = (id) => (storage ? storage.findById(id) : null);
const create = (reunificationCase) => (storage ? storage.create(reunificationCase) : null);
const update = (id, reunificationCase) => (storage ? storage.update(id, reunificationCase) : null);
const deleteById = (id) => (storage ? storage.delete(id) : null);

module.exports = {
    find, findById, create, update, deleteById,
};