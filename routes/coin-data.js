const express = require('express');
const router = express.Router();

const {
    getCoinData
} = require('../controllers/coin-data')

router.get('/', getCoinData);

module.exports = router
