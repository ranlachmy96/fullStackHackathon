const cors = require('cors');
const express = require('express');
const logger = require('./loggers/logger');
require('dotenv').config();
const { errorHandler } = require('./middlewares/errorHandler');
const { weatherUpdateRouter } = require("./routers/weatherUpdateRouter.router");

const app = express();
const port = process.env.PORT || 3000;

// Allow requests from any origin
// Configure CORS with dynamic origin
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from any origin
    callback(null, true);
  },
  credentials: true // Allow credentials (e.g., cookies, authorization headers)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/weatherUpdate', weatherUpdateRouter);

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

module.exports = app;
