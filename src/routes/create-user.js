const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/user-functions')

router.post('/', createUser);

module.exports = router;
