/** *************************************************************
 * Family Reunification Router
 * - Defines routes for handling family reunification cases
 * - Imports controllers for handling CRUD operations
 * - Defines HTTP methods for each route
 * - Exports the router for use in the main application
 ************************************************************** */
const { Router } = require('express');
const {
  getAllReunificationCase, getReunificationCase,
  createReunificationCase,
  updateReunificationCase,
  deleteReunificationCase,
} = require('../controllers/familyReunification.controller');

const familyReunificationRouter = new Router();

familyReunificationRouter.get('/', getAllReunificationCase);
familyReunificationRouter.get('/:id', getReunificationCase);
familyReunificationRouter.post('/', createReunificationCase);
familyReunificationRouter.put('/:id', updateReunificationCase);
familyReunificationRouter.put('/', updateReunificationCase);
familyReunificationRouter.delete('/:id', deleteReunificationCase);

module.exports = { familyReunificationRouter };
