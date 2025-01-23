// const express = require('express');
import express from 'express';
const router = express.Router();

// const { getAdaPrice } = require('../controllers/coin-data')
import { getAdaPrice } from '../controllers/coin-data.js';

router.get('/', getAdaPrice);

// module.exports = router;
export default router;