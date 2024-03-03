/** *************************************************************
 * Logger Configuration
 * - Configures logging using Morgan middleware
 * - Writes logs to a file named "access.log"
 * - Uses the "combined" log format
 ************************************************************** */
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const logger = morgan('combined', { stream: logStream });

module.exports = logger;
