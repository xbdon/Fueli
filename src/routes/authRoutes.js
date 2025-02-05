// const express = require('express');
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

// const { createUser } = require('../controllers/user-functions.js')
import { createUser, login } from '../controllers/user-functions.js'

// when users want to create an account
router.post('/register', createUser);

// when users want to login
router.post('/login', login);

// when users want to delete their account
router.delete('/delete',);

// for when users want to change their username
router.put('/:id',);



// module.exports = router;
export default router;
