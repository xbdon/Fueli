require("dotenv").config();
const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    console.log("made it to user-function controllers!")
    const { accData } = request.body;
    console.log(accData);
    if (!accData) {
        return response.status(400).send({ status: 'failed' });
    }
    console.log(`We made it to createUser function. And here is the data: ${accData}`);
    // userData.push(accData.user);
    console.log(accData);
    response.sendStatus(200).send({ status: 'recieved' });
}

module.exports = {
    createUser
}