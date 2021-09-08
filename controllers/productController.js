const path = require('path');
const uuid = require('uuid');
const ApiError = require('../exceptions/apiError');
const {Product} = require('../models/models');

class ProductController {
    createProduct(req, res, next) {
        try {
            const {
                name, 
                price, 
                description, 
                categoryId, 
                manufactureId 
            } = req.body;
            
            const {img} = req.files;

            const fileName = uuid.v4() + '.jpg';
            img.mv(path.join(__dirname, '..', 'static', fileName));

            Product.create({
                name, 
                price, 
                description, 
                categoryId, 
                manufactureId, 
                img: fileName
            }).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                next(err);
            })
        } catch (e) {
            next(e);
        }
    }

    getProduct(req, res, next) {
        try {
            const {id} = req.params;
            Product.findByPk(id).then(product => {

                if (!product) {
                    ApiError.BadRequest('Not found');
                }

                return res.json(product);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }

    getProducts(req, res, next) {
        try {
            let {categoryId, manufactureId, limit, page} = req.query;
            limit = +limit || 6;
            page = +page || 1;
            const offset = limit * page - limit;

            const queryObj = {};

            if (categoryId) {
                queryObj.categoryId = categoryId;
            }

            if (manufactureId) {
                queryObj.manufactureId = manufactureId;
            }
    
            Product.findAndCountAll({where: queryObj, limit, offset}).then(result => {
                res.json(result.rows);
            }).catch(err => {
                next(err);
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();