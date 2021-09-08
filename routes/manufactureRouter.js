const router = require('express').Router();
const manufactureController = require('../controllers/manufactureController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

router.get('/', manufactureController.getManufactures);
router.get('/:id', manufactureController.getManufacture);
router.post('/', checkRoleMiddleware('ADMIN'), manufactureController.createManufacture);
router.put('/:id', checkRoleMiddleware('ADMIN'), manufactureController.updateManufacture);
router.delete('/:id', checkRoleMiddleware('ADMIN'), manufactureController.deleteManufacture);

module.exports = router;