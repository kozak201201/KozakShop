const router = require('express').Router();
const productController = require('../controllers/productController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

router.get('/:id/comments', (req, res, next) => {
    req.productId = req.params.id;
    next();
}, commentController.getComments)

router.post('/:id/comments', authMiddleware, (req, res, next) => {
    req.productId = req.params.id;
    next();
}, commentController.createComment)

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', checkRoleMiddleware('ADMIN'), productController.createProduct);

module.exports = router;