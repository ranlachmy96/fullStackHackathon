const { Router } = require('express');
const {
    getAllWeatherUpdates, getWeatherUpdate,
    createWeatherUpdate,
    updateWeatherUpdate,
    deleteWeatherUpdate,
} = require('../controllers/weatherUpdate.controller');

const weatherUpdateRouter = new Router();

weatherUpdateRouter.get('/', getAllWeatherUpdates);
weatherUpdateRouter.get('/:id', getWeatherUpdate);
weatherUpdateRouter.post('/', createWeatherUpdate);
weatherUpdateRouter.put('/:id', updateWeatherUpdate);
weatherUpdateRouter.put('/', updateWeatherUpdate);
weatherUpdateRouter.delete('/:id', deleteWeatherUpdate);

module.exports = { weatherUpdateRouter };