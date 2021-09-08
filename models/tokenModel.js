const jwt = require('jsonwebtoken');
const redis = require('redis');
const ApiError = require('../exceptions/apiError');
const redisClient = redis.createClient();

const accessExpires = 15;
const refreshExpires = 15;

class TokenModel {
    createTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {expiresIn: `${accessExpires}m`});
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {expiresIn: `${refreshExpires}d`});

        const userLogin = payload.login;

        redisClient.setex(userLogin, refreshExpires * 60 * 60 * 24, refreshToken);

        return ({accessToken, refreshToken});
    }

    valideAccessToken(accessToken) {
        const data = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS);
        return data;
    }

    valideRefreshToken(refreshToken) {
        const data = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

        const promise = new Promise((resolve, reject) => {
            redisClient.get(data.login, (err, result) => {
                const isValidRefresh = result == refreshToken;
                if (!result || err || !isValidRefresh) return reject(ApiError.NoAccess('Invalid token'));
                else return resolve(data);
            });
        });

        return promise;
    }

    deleteToken(login) {
        const promise = new Promise((resolve, reject) => {
            redisClient.del(login, (err, result) => {
                if (!result || err) return reject(ApiError.NoAccess('Invalid token'));
                return resolve(result);
            });
        });

        return promise;
    }
}

module.exports = new TokenModel();