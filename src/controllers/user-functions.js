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
    // we get their email, and we look up the password associated with that email in the db 
    //  if we compare the encrypted password with password input of login it wont match
    //  we must encrypt the password input and then compare it to db on file
    // before we create the login function, I would like to finish 
    // the save coin post method, so we can add funcitonality to a logged in user
}


// currently going through coin-data.js router, may need to change
const saveCoin = (req, res) => {
    console.log("Eureka!!!");
    try {
        // now that we have a user, I want to add a saving coin to watchlist functionality
        const insertCoin = db.prepare(`INSERT INTO watchlist (user_id, ticker, coin_id)
            VALUES (?, ?, ?)`)

        // need to add a frontend and backend to facilitate
        // data entries into watchlist database
        // i may need to have a login function first
        insertCoin.run(result.lastInsertRowid,)

        console.log("Your Fueli account was created!");
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }
}

export { createUser, saveCoin };