require("dotenv").config();
const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    const { accData } = request.query;
    console.log(`We made it to createUser function. And here is the data: ${accData}`);
    userData.push(accData.user);
    response.sendStatus(201);
}

module.exports = {
    createUser
}