const path = require('path');
const uuid = require('uuid');
const {Product} = require('../models/models');

class ProductController {
    createProduct(req, res) {
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
                res.status(500).json(err);
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    getProduct(req, res) {
        try {
            const {id} = req.params;
            Product.findByPk(id).then(product => {

                if (!product) {
                    return res.status(404).send('Not found');
                }

                return res.json(product);
            }).catch(err => {
                res.status(500).json(err);
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    getProducts(req, res) {
        try {
            let {categoryId, manufactureId, limit, page} = req.query;
            console.log(typeof page);
            limit = +limit || 6;
            page = +page || 1;
            const offset = limit * page - limit;
    
            Product.findAndCountAll({where: {categoryId, manufactureId}, limit, offset}).then(result => {
                res.json(result.rows);
            }).catch(err => {
                res.status(500).json(err);
            });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
}

module.exports = new ProductController();