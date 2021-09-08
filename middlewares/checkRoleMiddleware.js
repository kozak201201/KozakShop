const tokenModel = require('../models/tokenModel');

module.exports = function(role) {
    return function(req, res, next) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({message: 'Unauthorize'});
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Unauthorize'});
        }

        tokenModel.valideRefreshToken(token).then(userDto => {
            if (userDto.role !== role) {
                return res.status(403).json({message: 'No access'})
            }
            next();
        }).catch(err => {
            return res.status(500).json({message: err.message});
        });
    }
}