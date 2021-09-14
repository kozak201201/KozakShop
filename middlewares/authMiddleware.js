const ApiError = require("../exceptions/apiError");
const tokenModel = require("../models/tokenModel");

module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(ApiError.Unauthorize());
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.Unauthorize());
        }

        const user = tokenModel.valideAccessToken(accessToken);
        req.user = user;
        next();
    } catch (e) {
        return next(ApiError.Unauthorize())
    }
}