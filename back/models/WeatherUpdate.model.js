const { Schema, model } = require('mongoose');

const weatherUpdateSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true }, // Assuming time is represented as a string for simplicity
    date: { type: Date, default: Date.now }, // Default to current date if not provided
    status: { type: String, enum: ['sunny', 'rainy', 'cloudy'], default: 'sunny' }
}, { collection: 'weatherUpdates' });

module.exports = model('WeatherUpdate', weatherUpdateSchema);

