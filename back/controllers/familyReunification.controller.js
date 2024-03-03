/** *************************************************************
 * Family Reunification Controller
 * - Handles CRUD operations for family reunification cases
 * - Imports repository for database operations
 * - Defines methods for each CRUD operation
 * - Implements error handling for each method
 ************************************************************** */
const {
  find, findById, findByParents, create, update, deleteById,
} = require('../repositories/familyReunification.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent } = require('../errors/400.errors');

const generateId = async () => {
  try {
    const reunificationCases = await find();
    if (reunificationCases.length === 0) {
      return 1;
    }
    let maxId = 0;
    reunificationCases.forEach((reunificationCase) => {
      // eslint-disable-next-line no-underscore-dangle
      if (reunificationCase._id > maxId) {
        // eslint-disable-next-line no-underscore-dangle
        maxId = reunificationCase._id;
      }
    });
    return maxId + 1;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

exports.getAllReunificationCase = async (req, res, next) => {
  try {
    const result = await find();
    if (result.length === 0) {
      throw new EntityNotFound('familyReunification data ');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getReunificationCase = async (req, res, next) => {
  try {
    const result = await findById(req.params.id);
    if (result.length === 0) {
      throw new PropertyNotFound(`specific familyReunification data with id of ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.createReunificationCase = async (req, res, next) => {
  try {
    if (!req.body.parents || !req.body.children
        || !req.body.active || !req.body.reunion_date || !req.body.reunion_location) {
      throw new BodyNotSent();
    }
    if (req.body.parents.length === 0) {
      throw new Error('At least one parent must be provided.');
    }

    const existingCase = await findByParents(req.body.parents);
    console.log(existingCase);
    if (JSON.stringify(existingCase) !== '[]') { throw new PropertyExists('parents'); }
    const { body: reunificationCase } = req;
    // eslint-disable-next-line no-underscore-dangle
    reunificationCase._id = await generateId();
    const result = await create(reunificationCase);
    res.status(200).json(result || 'added successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateReunificationCase = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === '{}') {
      throw new EntityNotFound('updated familyReunification data');
    }
    if (!req.params.id) {
      throw new PropertyNotFound('ID');
    }
    const existingCase = await findById(req.params.id);
    if (existingCase.length === 0) {
      throw new PropertyNotFound(`Reunification case with id ${req.params.id}`);
    }

    const { body: reunificationCase, params: { id } } = req;
    const result = await update(id, reunificationCase);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteReunificationCase = async (req, res, next) => {
  try {
    const existingCase = await findById(req.params.id);
    if (existingCase.length === 0) {
      throw new PropertyNotFound(`Reunification case with id ${req.params.id}`);
    }
    const { params: { id } } = req;
    const result = await deleteById(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
