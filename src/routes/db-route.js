// const express = require('express');
import express from 'express';
const router = express.Router();

// const { dbFetch } = require('../controllers/coin-data')
import { dbFetch } from '../controllers/coin-data.js';

router.get('/', dbFetch);

// module.exports = router;
export default router;

