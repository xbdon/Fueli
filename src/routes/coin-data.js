// const express = require('express');
import express from 'express';
import db from '../db.js'
const router = express.Router();

// const { getCoinData } = require('../controllers/coin-data')
import { getCoinData, getVolumeData } from '../controllers/coin-data.js'

// uploads coin data by marketcap
router.get('/', getCoinData);

// for when users remove coin from watchlist
router.get('/getCoinsByVolume', getVolumeData);

// module.exports = router;
export default router;
