require("dotenv").config();
const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    console.log("made it to user-function controllers!")
    const { data } = request.body;
    console.log(data);
    if (!data) {
        return response.status(400).send({ status: 'failed' });
    }
    console.log(`We made it to createUser function. And here is the data: ${data}`);
    // userData.push(accData.user);
    console.log(data);
    return response.sendStatus(200).send({ status: 'recieved' });
}

module.exports = {
    createUser
}