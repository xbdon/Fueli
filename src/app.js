// const express = require("express");
// const app = express();
// const coinData = require('./routes/coin-data');
// const searchToken = require('./routes/search-token');
// const adaPrice = require('./routes/ada-price');
// const dbFetch = require('./routes/db-route');
// const createUser = require('./routes/create-user');

import express from 'express';
import coinData from './routes/coin-data.js';
import searchToken from './routes/search-token.js';
import adaPrice from './routes/ada-price.js';
import authRoutes from './routes/authRoutes.js';
import userFunctions from './routes/user-functions.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();


app.use((express.static("./public")))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/coin-data', coinData);
app.use('/api/search-coin/get/', searchToken);
app.use('/api/ada-price/get', adaPrice);
app.use('/auth', authRoutes);
app.use('/user-functions', authMiddleware, userFunctions);


app.listen(3000, () => {
  console.log("It's alive HAUHAHUAHUAHUA!!!!")
})

// will convert server to modules type instead of commonjs next session