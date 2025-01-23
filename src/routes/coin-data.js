// const express = require('express');
import express from 'express';
import db from '../db.js'
const router = express.Router();

// const { getCoinData } = require('../controllers/coin-data')
import { getCoinData } from '../controllers/coin-data.js'

router.get('/', getCoinData);

// for when user saves a coin to their watchlist
router.post('/save',);

// for when users remove coin from watchlist
router.put('/:id',)

//

// module.exports = router;
export default router;
