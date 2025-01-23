// const express = require('express');
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

// const { createUser } = require('../controllers/user-functions.js')
import createUser from '../controllers/user-functions.js'

router.post('/register', createUser);

router.post('/login',)

// module.exports = router;
export default router;
