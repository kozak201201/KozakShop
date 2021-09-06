const {Category} = require('../models/models');

class CategoryController {
    getCategories(req, res) {
        Category.findAll({raw: true}).then(categories => {
            res.send(categories);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    getCategory(req, res) {
        try {
            const {id} = req.params;
            Category.findOne({where: {id}, raw: true}).then(category => {

                if (!category) {
                    return res.status(500).json({message: `Not found category with id: ${id}`});
                }

                return res.json(category);
            });
        } catch (e) {
            res.status(500).send(e);
        }
    }

    createCategory(req, res) {
        try {
            const {name} = req.body;
            Category.create({name}).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).json(err);
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    updateCategory(req, res) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            Category.findOne({where: {id}, raw: true}).then(category => {

                if (!category) {
                    return res.status(500).json({message: `Not found category with id: ${id}`});
                }

                Category.update({name}, {where: {id}}).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    res.status(500).send(err);
                });
            });

        } catch (e) {
            res.status(500).json(e);
        }
    }

    deleteCategory(req, res) {
        try {
            const {id} = req.params;

            Category.destroy({where: {id}}).then(result => {
                if (!result) {
                    return res.status(404).json({message: `Not found category with id: ${id}`});
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

module.exports = new CategoryController();