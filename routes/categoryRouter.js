const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', checkRoleMiddleware('ADMIN'), categoryController.createCategory);
router.put('/:id', checkRoleMiddleware('ADMIN'), categoryController.updateCategory);
router.delete('/:id', checkRoleMiddleware('ADMIN'), categoryController.deleteCategory);

module.exports = router;