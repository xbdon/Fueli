require("dotenv").config();
const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    // const newEntry = request.body;
    // console.log(`We made it to createUser function. And here is the data: ${newEntry}`);
    // userData.push(newEntry.user);
    // response.sendStatus(201);
}

createUser();

module.exports = {
    createUser
}