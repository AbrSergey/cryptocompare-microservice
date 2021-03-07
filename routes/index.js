const router = require('express').Router();
const { price } = require('../controllers');

router.get('/price', price.get);

module.exports = router;
