const authModel = require('../models/authModel');

class AuthController {
    registration(req, res) {
        try {
            const {login, password} = req.body;

            authModel.registration(login, password).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                res.status(500).json(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    login(req, res) {
        try {
            const {login, password} = req.body;

            authModel.login(login, password).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                res.status(500).json(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    logout(req, res) {
        try {
            const {refreshToken} = req.cookies;

            authModel.logout(refreshToken).then(() => {
                res.clearCookie('refreshToken');
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).json(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;

            authModel.refresh(refreshToken).then(resultData => {
                res.cookie('refreshToken', resultData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(resultData);
            }).catch(err => {
                res.status(500).json(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new AuthController();