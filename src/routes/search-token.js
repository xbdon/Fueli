// const express = require('express');
import express from 'express';
const router = express.Router();

// const { getSearchToken } = require('../controllers/coin-data')
import { getSearchToken } from '../controllers/coin-data.js';

router.get('/', getSearchToken);

// module.exports = router;
export default router;
