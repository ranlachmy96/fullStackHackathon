const { Schema, model } = require('mongoose');

const weatherUpdateSchema = new Schema({
    _id: { type: Number },
    name: { type: String },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    location: { type: String, required: true },
    time: { type: String},
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['sunny', 'rainy', 'cloudy'], default: 'sunny' }
}, { collection: 'weatherUpdates' });

module.exports = model('WeatherUpdate', weatherUpdateSchema);

