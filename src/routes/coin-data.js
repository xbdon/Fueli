// const express = require('express');
import express from 'express';
import db from '../db.js'
const router = express.Router();

// const { getCoinData } = require('../controllers/coin-data')
import { getCoinData } from '../controllers/coin-data.js'

// uploads coin data by marketcap
router.get('/', getCoinData);

router.get('/getSavedCoins',);

// for when user saves a coin to their watchlist
router.post('/save-coin',);

// for when users remove coin from watchlist
router.delete('/',);

// module.exports = router;
export default router;
