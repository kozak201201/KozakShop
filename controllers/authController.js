const authModel = require('../models/authModel');

class AuthController {
    registration(req, res, next) {
        try {
            const {login, password} = req.body;

            authModel.registration(login, password).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }

    login(req, res, next) {
        try {
            const {login, password} = req.body;

            authModel.login(login, password).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }

    logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            authModel.logout(refreshToken).then(() => {
                res.clearCookie('refreshToken');
                res.sendStatus(200);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }

    refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            authModel.refresh(refreshToken).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();