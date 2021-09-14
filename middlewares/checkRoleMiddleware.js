const ApiError = require('../exceptions/apiError');
const tokenModel = require('../models/tokenModel');

module.exports = function(role) {
    return function(req, res, next) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.Unauthorize());
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return next(ApiError.Unauthorize());
        }

        const userDto = tokenModel.valideAccessToken(token);
        if (userDto.role !== role) {
            return next(ApiError.NoAccess('Invalid token'));
        }
        next();
    }
}