const router = require('express').Router();

const categoryRouter = require('./categoryRouter');
const manufactureRouter = require('./manufactureRouter');
const productRouter = require('./productRouter');
const authRouter = require('./authRouter');

router.use('/categories', categoryRouter);
router.use('/manufactures', manufactureRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);

module.exports = router;