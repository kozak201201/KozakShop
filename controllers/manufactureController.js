const {Manufacture} = require('../models/models');

class ManufactureController {
    getManufactures(req, res) {
        Manufacture.findAll({raw: true}).then(manufactures => {
            res.send(manufactures);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    getManufacture(req, res) {
        try {
            const {id} = req.params;
            Manufacture.findOne({where: {id}, raw: true}).then(manufacture => {

                if (!manufacture) {
                    return res.status(500).json({message: `Not found manufacture with id: ${id}`});
                }

                return res.json(manufacture);
            });
        } catch (e) {
            res.status(500).send(e);
        }
    }

    createManufacture(req, res) {
        try {
            const {name} = req.body;
            Manufacture.create({name}).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).json(err);
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    updateManufacture(req, res) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            Manufacture.findOne({where: {id}, raw: true}).then(manufacture => {

                if (!manufacture) {
                    return res.status(500).json({message: `Not found manufacture with id: ${id}`});
                }

                Manufacture.update({name}, {where: {id}}).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    res.status(500).send(err);
                });
            });

        } catch (e) {
            res.status(500).json(e);
        }
    }

    deleteManufacture(req, res) {
        try {
            const {id} = req.params;

            Manufacture.destroy({where: {id}}).then(result => {
                if (!result) {
                    return res.status(404).json({message: `Not found manufacture with id: ${id}`});
                }

                return res.sendStatus(200);
            }).catch(err => {
                res.status(500).send(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new ManufactureController();