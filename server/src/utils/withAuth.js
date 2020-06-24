const env = require('../../config');
const jwt = require('jsonwebtoken');

const secret = env.dev.jwtSecret;

const withAuth = function (req, res, next) {

};

module.exports = withAuth;
