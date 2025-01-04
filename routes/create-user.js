const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/user-functions')

router.get('/', createUser);

module.exports = router;
