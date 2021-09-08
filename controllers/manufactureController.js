const ApiError = require('../exceptions/apiError');
const {Manufacture} = require('../models/models');

class ManufactureController {
    getManufactures(req, res, next) {
        Manufacture.findAll({raw: true}).then(manufactures => {
            res.send(manufactures);
        }).catch(err => {
            next(err);
        });
    }

    getManufacture(req, res, next) {
        try {
            const {id} = req.params;
            Manufacture.findOne({where: {id}, raw: true}).then(manufacture => {

                if (!manufacture) {
                    next(ApiError.BadRequest(`Not found manufacture with id: ${id}`));
                }

                return res.json(manufacture);
            });
        } catch (e) {
            next(e);
        }
    }

    createManufacture(req, res, next) {
        try {
            const {name} = req.body;
            Manufacture.create({name}).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                next(err);
            })
        } catch (e) {
            next(e);
        }
    }

    updateManufacture(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            Manufacture.findOne({where: {id}, raw: true}).then(manufacture => {

                if (!manufacture) {
                    next(ApiError.BadRequest(`Not found manufacture with id: ${id}`));
                }

                Manufacture.update({name}, {where: {id}}).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    next(err);
                });
            });
        } catch (e) {
            next(e);
        }
    }

    deleteManufacture(req, res, next) {
        try {
            const {id} = req.params;

            Manufacture.destroy({where: {id}}).then(result => {

                if (!result) {
                    next(ApiError.BadRequest(`Not found manufacture with id: ${id}`));
                }

                return res.sendStatus(200);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ManufactureController();