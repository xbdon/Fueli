// const express = require('express');
import express from 'express';
import db from '../db.js'
const router = express.Router();

// const { getCoinData } = require('../controllers/coin-data')
import { getCoinData, getVolumeData } from '../controllers/coin-data.js'

// uploads coin data by marketcap
router.get('/', getCoinData);

// uploads coin data by volume
router.get('/getVolumeData/:time-frame', getVolumeData);

// module.exports = router;
export default router;
