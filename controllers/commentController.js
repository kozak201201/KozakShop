const ApiError = require('../exceptions/apiError');
const {Comment, Product} = require('../models/models');

class CommentController {
    async createComment(req, res, next) {
        try {
            const userId = req.user.id;
            const {productId} = req;
            const {comment} = req.body;

            const product = await Product.findByPk(productId);

            if (!product) {
                return next(ApiError.BadRequest(`Product with id ${productId} didn't find`));
            }

            await Comment.create({userId, productId, comment});
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async getComments(req, res, next) {
        try {
            const {productId} = req;

            const product = await Product.findByPk(productId);

            if (!product) {
                return next(ApiError.BadRequest(`Product with id ${productId} didn't find`));
            }

            const comments = await Comment.findAll({where: {productId}, raw: true});
            res.json(comments);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentController();