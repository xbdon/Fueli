import express from 'express';
import db from '../db.js'
const router = express.Router();

import { saveCoin, getWatchlist, deleteCoin, checkCoin } from '../controllers/user-functions.js';

// gets watchlist to display on front-end
router.get('/getWatchlist', getWatchlist);

// for when user saves a coin to their watchlist
router.post('/save-coin', saveCoin);

// deletes coins from watchlist db
router.delete('/delete-coin/:ticker/:coinId', deleteCoin);

// checks if coin is already in watchlist
router.get('/check-coin', checkCoin);

export default router;