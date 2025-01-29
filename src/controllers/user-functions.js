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

        // now that we have a user, I want to add a saving coin to watchlist functionality
        const insertCoin = db.prepare(`INSERT INTO watchlist (user_id, coin, ticker, coin_id)
            VALUES (?, ?, ?)`)

        // need to add a frontend and backend to use facilitate
        // data entries into watchlist database
        insertCoin.run(result.lastInsertRowid,)

        console.log("Your Fueli account was created!");
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }

    console.log("Your Fueli account was created!");
    res.sendStatus(201);
}

const login = (req, res) => {
    // we get their email, and we look up the password associated with that email in the db 
    //  if we compare the encrypted password with password input of login it wont match
    //  we must encrypt the password input and then compare it to db on file

}

export default createUser;