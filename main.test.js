
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const User = require('./db/models/User');
const sendEmail = require('./handlers/sendEmail');

