const router = require('express').Router();
const manufactureController = require('../controllers/manufactureController');

router.get('/', manufactureController.getManufactures);
router.get('/:id', manufactureController.getManufacture);
router.post('/', manufactureController.createManufacture);
router.put('/:id', manufactureController.updateManufacture);
router.delete('/:id', manufactureController.deleteManufacture);

module.exports = router;