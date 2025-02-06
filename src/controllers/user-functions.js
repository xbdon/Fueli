// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const createUser = (req, res) => {
    const { username, password } = req.body;
    // save username and irreversibly encrypt password

    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

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
    console.log("made it to users   " + email, password)
    console.log(email);

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = getUser.get(email);

        console.log(user);

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
    try {
        console.log(ticker, coinId)
        // now that we have a user, I want to add a saving coin to watchlist functionality
        const insertCoin = db.prepare(`INSERT INTO watchlist (user_id, ticker, coin_id)
            VALUES (?, ?, ?)`)

        // frontend and backend integration successful
        // post method is erroring however because result variable
        // below is undefined. Need to figure out how to get user_ID
        // of user who saved coin to watchlist, next sesh goal
        // insertCoin.run(result.lastInsertRowid,)

        console.log("Your Fueli account was created!");
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }
}

export { createUser, saveCoin, login };