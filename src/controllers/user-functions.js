// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const createUser = (req, res) => {
    const { email, username, password, cPassword } = req.body;
    // save username and irreversibly encrypt password

    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
        const insertUser = db.prepare(``)
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