// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const createUser = (req, res) => {
    const { email, username, password, cPassword } = req.body;
    console.log("XxX")
    console.log(email, username, password, cPassword)

    console.log("Your Fueli account was created!");
    res.sendStatus(201);
}

const login = (req, res) => {

}

export default createUser;