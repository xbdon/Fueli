require("dotenv").config();
const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    const newEntry = request.body;
    console.log(newEntry);
    userData.push(newEntry.user);
    response.sendStatus(201);
}

module.exports = {
    createUser
}