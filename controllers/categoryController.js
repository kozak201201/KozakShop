const ApiError = require('../exceptions/apiError');
const {Category} = require('../models/models');

class CategoryController {
    getCategories(req, res, next) {
        Category.findAll({raw: true}).then(categories => {
            res.send(categories);
        }).catch(err => {
            next(err);
        });
    }

    getCategory(req, res, next) {
        try {
            const {id} = req.params;
            Category.findOne({where: {id}, raw: true}).then(category => {

                if (!category) {
                    return next(ApiError.BadRequest(`Not found category with id: ${id}`));
                }

                return res.json(category);
            });
        } catch (e) {
            next(e);
        }
    }

    createCategory(req, res, next) {
        try {
            const {name} = req.body;
            Category.create({name}).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }

    updateCategory(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            Category.findOne({where: {id}, raw: true}).then(category => {

                if (!category) {
                    next(ApiError.BadRequest(`Not found category with id: ${id}`));
                }

                Category.update({name}, {where: {id}}).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    next(err);
                });
            });
        } catch (e) {
            next(e);
        }
    }

    deleteCategory(req, res, next) {
        try {
            const {id} = req.params;

            Category.destroy({where: {id}}).then(result => {

                if (!result) {
                    next(ApiError.BadRequest(`Not found category with id: ${id}`));
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

module.exports = new CategoryController();