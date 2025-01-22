const express = require('express');
const router = express.Router();

const { dbFetch } = require('../controllers/coin-data')

router.get('/', dbFetch);

module.exports = router;

