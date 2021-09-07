const router = require('express').Router();

const categoryRouter = require('./categoryRouter');
const manufactureRouter = require('./manufactureRouter');
const productRouter = require('./productRouter');

router.use('/categories', categoryRouter);
router.use('/manufactures', manufactureRouter);
router.use('/products', productRouter);

module.exports = router;