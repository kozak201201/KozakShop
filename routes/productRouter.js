const router = require('express').Router();
const productController = require('../controllers/productController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', checkRoleMiddleware('ADMIN'), productController.createProduct);

module.exports = router;