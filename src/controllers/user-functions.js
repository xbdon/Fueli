// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import db from '../db.js'

const createUser = (request, response) => {
    console.log(request.body);
    try {
        console.log("made it to user-function controllers!")
        const data = request.body;
        console.log("Your Fueli account was created!");
        // return response.sendStatus(200).send({ status: 'recieved' });
    } catch (err) {
        console.log(err)
        response.status(400).send({ status: 'failed' });
    }
}

export default createUser;