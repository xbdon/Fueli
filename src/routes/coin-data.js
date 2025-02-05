// const express = require('express');
import express from 'express';
import db from '../db.js'
const router = express.Router();

// const { getCoinData } = require('../controllers/coin-data')
import { getCoinData, getWatchlist } from '../controllers/coin-data.js'
import { saveCoin } from '../controllers/user-functions.js';

// uploads coin data by marketcap
router.get('/', getCoinData);

router.get('/getWatchlist', getWatchlist);

// for when user saves a coin to their watchlist
router.post('/save-coin', saveCoin);

// for when users remove coin from watchlist
router.delete('/',);

// module.exports = router;
export default router;
