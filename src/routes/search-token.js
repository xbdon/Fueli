const express = require('express');
const router = express.Router();

const { getSearchToken } = require('../controllers/coin-data')

router.get('/', getSearchToken);

module.exports = router;
