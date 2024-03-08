const {
    find, findById, create, update, deleteById,
} = require('../repositories/weatherUpdate.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent } = require('../errors/400.errors');


const generateId = async () => {
    try {
        const weatherUpdates = await find();
        if (weatherUpdates.length === 0) {
            return 1;
        }
        let maxId = 0;
        weatherUpdates.forEach((weatherUpdate) => {
            // eslint-disable-next-line no-underscore-dangle
            if (weatherUpdate._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = weatherUpdate._id;
            }
        });
        return maxId + 1;
    } catch (error) {
        console.error('Error generating ID:', error);
        throw error;
    }
};


exports.getAllWeatherUpdates = async (req, res, next) => {
    try {
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('WeatherUpdates data ');
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getWeatherUpdate = async (req, res, next) => {
    try {
        const result = await findById(req.params.id);
        if (result.length === 0) {
            throw new PropertyNotFound(`specific WeatherUpdate data with id of ${req.params.id}`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.createWeatherUpdate = async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.temperature || !req.body.humidity || !req.body.location || !req.body.time) {
            throw new BodyNotSent();
        }
        const { body: weatherUpdate } = req;
        // eslint-disable-next-line no-underscore-dangle
        weatherUpdate._id = await generateId();
        const result = await create(weatherUpdate);
        res.status(200).json(result || 'added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateWeatherUpdate = async (req, res, next) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated WeatherUpdate data');
        }
        if (!req.params.id) {
            throw new PropertyNotFound('ID');
        }
        const existingCase = await findById(req.params.id);
        if (existingCase.length === 0) {
            throw new PropertyNotFound(`WeatherUpdate with id ${req.params.id}`);
        }

        const { body: weatherUpdate, params: { id } } = req;
        const result = await update(id, weatherUpdate);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteWeatherUpdate = async (req, res, next) => {
    try {
        const existingWeatherUpdate = await findById(req.params.id);
        if (existingWeatherUpdate.length === 0) {
            throw new PropertyNotFound(`Reunification case with id ${req.params.id}`);
        }
        //add a check if doesnt exists
        const { params: { id } } = req;
        const result = await deleteById(id);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};