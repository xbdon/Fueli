// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js';

const createUser = async (req, res) => {
    const { email, username, password } = req.body;
    // save username and irreversibly encrypt password

    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
        const user = await prisma.users.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        })
        // const insertUser = db.prepare(`INSERT INTO users (email, username, password)
        //     VALUES (?, ?, ?)`)
        // const result = insertUser.run(email, username, hashedPassword)

        // creating token for login
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
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

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        // const user = getUser.get(email);
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

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
const saveCoin = async (req, res) => {
    console.log("Saving coin...");
    const { ticker, coinId } = req.body;
    const userId = req.userId;
    try {
        console.log(ticker, coinId, userId)
        // // now that we have a user, I want to add a saving coin to watchlist functionality
        // const insertCoin = db.prepare(`INSERT INTO watchlist (user_id, ticker, coin_id)
        //     VALUES (?, ?, ?)`)

        // insertCoin.run(userId, ticker, coinId)

        const insertCoin = await prisma.watchlist.create({
            data: {
                user_id: userId,
                ticker: ticker,
                coin_id: coinId
            }
        })

        if (insertCoin) {
            return res.json({ outcome: "Successful" })
        } else {
            console.log("coin failed to be save")
        }
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }
}

const getWatchlist = async (req, res) => {
    const userId = req.userId

    try {
        // const getSavedCoins = db.prepare('SELECT * FROM watchlist WHERE user_id = ?')
        // const watchlist = getSavedCoins.all(userId)
        const watchlist = await prisma.watchlist.findMany({
            where: {
                user_id: userId
            }
        })
        console.log(watchlist)
        res.json(watchlist)
    } catch {
        console.log(err.message)
        res.sendStatus(503)
    }
}

const deleteCoin = async (req, res) => {
    console.log("deleting coin...")
    const { ticker, coinId } = req.params
    const userId = req.userId;

    try {
        // const deleteCoin = db.prepare(`DELETE FROM watchlist WHERE user_id = ? AND ticker = ? AND coin_id = ?`)
        // deleteCoin.run(userId, ticker, coinId)

        const deleteCoin = await prisma.watchlist.delete({
            data: {
                user_id: userId,
                ticker: ticker,
                coin_id: coinId
            }
        })

        if (deleteCoin) {
            return res.json({ outcome: "Successful" })
        } else {
            console.log("coin was unable to be removed")
        }
    } catch (err) {
        console.log(err)
        res.send(503)
    }
}

const checkCoin = async (req, res) => {
    const { coinId, ticker } = req.params
    const userId = req.userId
    // const checkCoin = db.prepare(`SELECT EXISTS(SELECT 1 FROM watchlist WHERE user_id = ? AND ticker = ? AND coin_id = ?) AS coin_exists`)
    // const bool = checkCoin.get(userId, ticker, coinId)

    const checkCoin = await prisma.watchlist.count({
        where: {
            user_id: userId,
            ticker: ticker,
            coin_id: coinId
        }
    })
    // + is a unary operator to convert boolean value to integer
    res.json({ coin: +checkCoin })
}

// coin_id can be added to this query; will be on todo list
const checkCoinMain = async (req, res) => {
    const { ticker } = req.params
    const userId = req.userId
    // const checkCoin = db.prepare(`SELECT EXISTS(SELECT 1 FROM watchlist WHERE user_id = ? AND ticker = ?) AS coin_exists`)
    // const bool = checkCoin.get(userId, ticker)

    const checkCoin = await prisma.watchlist.count({
        where: {
            user_id: userId,
            ticker: ticker,
            coin_id: coinId
        }
    })
    // + is a unary operator to convert boolean value to integer
    res.json({ coin: +checkCoin })
}

export { createUser, saveCoin, login, getWatchlist, deleteCoin, checkCoin, checkCoinMain };