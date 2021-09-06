const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient();

const accessExpires = 15;
const refreshExpires = 15;

class TokenModel {
    createTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {expiresIn: `${accessExpires}m`});
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {expiresIn: `${refreshExpires}d`});

        const userLogin = payload.login;

        redisClient.setex(userLogin, refreshExpires * 60 * 60 * 24, refreshToken); //refreshExpires days in seconds

        return ({accessToken, refreshToken});
    }

    getToken(login) {
        const promise = new Promise((resolve, reject) => {
            redisClient.get(login, (err, result) => {
                if (!result || err) return reject(new Error('Invalid token'));
                return resolve(result);
            });
        });

        return promise;
    }

    valideAccessToken(accessToken) {
        const data = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS);
        return data;
    }

    valideRefreshToken(refreshToken) {
        const data = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

        const promise = new Promise((resolve, reject) => {
            redisClient.get(data.login, (err, result) => {
                if (!result || err) return reject(new Error('Invalid token'));
                return resolve(result);
            });
        });

        return promise;
    }

    deleteToken(login) {
        const promise = new Promise((resolve, reject) => {
            redisClient.del(login, (err, result) => {
                if (!result || err) return reject(new Error('Invalid token'));
                return resolve(result);
            });
        });

        return promise;
    }
}

module.exports = new TokenModel();