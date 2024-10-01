const express = require('express');
const router = express.Router();

const { getAdaPrice } = require('../controllers/coin-data')

router.get('/', getAdaPrice);

module.exports = router;