const express = require('express');
const router = express.Router();

const {
    getCoinData,
    getSearchToken

} = require('../controllers/coin-data')

router.get('/', getCoinData);
router.get('/', getSearchToken);

module.exports = router;
