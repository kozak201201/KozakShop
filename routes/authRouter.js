const router = require('express').Router();
const userController = require('../controllers/authController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.get('/logout', userController.logout);

module.exports = router;