import express from 'express';
import db from '../db.js'
const router = express.Router();

import { getWatchlist } from '../controllers/coin-data.js'
import { saveCoin } from '../controllers/user-functions.js';

// gets watchlist to display on front-end
router.get('/getWatchlist', getWatchlist);

// for when user saves a coin to their watchlist
router.post('/save-coin', saveCoin);

export default router;