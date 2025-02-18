// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const createUser = (req, res) => {
    const { email, username, password } = req.body;
    // save username and irreversibly encrypt password

    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (email, username, password)
            VALUES (?, ?, ?)`)
        const result = insertUser.run(email, username, hashedPassword)

        // creating token for login
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        // sending back json as a response
        // providing an object as a key value
        res.json({ token })

        console.log("Your Fueli account was created!");
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }

    console.log("Explore Fueli!");
}

const login = (req, res) => {
    const { email, password } = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = getUser.get(email);

        // searches database to see if any user is associated with that email above
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        };

        // compareSync() hashes first argument(password) and compares it with 2nd arg (user.password) which is the hashed password in database for user
        const passIsValid = bcrypt.compareSync(password, user.password)
        if (!passIsValid) {
            return res.status(401).send({ message: "Invalid password" })
        }

        // succesful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
}


// currently going through coin-data.js router, may need to change
const saveCoin = (req, res) => {
    console.log("Eureka!!!");
    const { ticker, coinId } = req.body;
    const userId = req.userId;
    try {
        console.log(ticker, coinId, userId)
        // now that we have a user, I want to add a saving coin to watchlist functionality
        const insertCoin = db.prepare(`INSERT INTO watchlist (user_id, ticker, coin_id)
            VALUES (?, ?, ?)`)

        insertCoin.run(userId, ticker, coinId)

        console.log("Success! Coin saved to watchlist!");

        res.json({ outcome: "Successful" })
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }
}

const getWatchlist = (req, res) => {
    const userId = req.userId

    try {
        const getSavedCoins = db.prepare('SELECT * FROM watchlist WHERE user_id = ?')
        const watchlist = getSavedCoins.all(userId)
        console.log(watchlist)
        res.json(watchlist)
    } catch {
        console.log(err.message)
        res.sendStatus(503)
    }
}

const deleteCoin = (req, res) => {
    const { ticker, coinId } = req.params
    const userId = req.userId;
    const deleteCoin = db.prepare(`DELETE FROM watchlist WHERE user_id = ? AND ticker = ? AND coin_id = ?`)
    deleteCoin.run(userId, ticker, coinId)
    res.json({ message: "Coin removed from watchlist" })
}

const checkCoin = (req, res) => {
    const { coinId } = req.params
    const userId = req.userId
    const checkCoin = db.prepare(`SELECT EXISTS(SELECT 1 FROM watchlist WHERE user_id = ? AND coin_id = ?) AS coin_exists`)
    const bool = checkCoin.get(userId, coinId)
    res.json({ coin: bool })

}

const checkCoinMain = (req, res) => {

}

export { createUser, saveCoin, login, getWatchlist, deleteCoin, checkCoin, checkCoinMain };