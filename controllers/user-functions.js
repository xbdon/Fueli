const axios = require("axios");
const db = require('../db');

const createUser = (request, response) => {
    console.log(request.body);
    try {
        console.log("made it to user-function controllers!")
        const data = request.body;
        console.log(data);
        return response.sendStatus(200).send({ status: 'recieved' });
    } catch (err) {
        console.log(err)
        response.status(400).send({ status: 'failed' });
    }
}

module.exports = {
    createUser
}