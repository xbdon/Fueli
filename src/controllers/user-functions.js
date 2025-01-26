// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import db from '../db.js'

const createUser = (req, res) => {
    const { email, username, password, cPassword } = req.body;
    console.log("XxX")
    console.log(email, username, password, cPassword)

    try {
        console.log("Your Fueli account was created!");
        // return res.sendStatus(200).send({ status: 'recieved' });
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: 'failed' });
    }
}

export default createUser;