const express = require("express");
const app = express();
const coinData = require('./routes/coin-data');
const searchToken = require('./routes/search-token');
const adaPrice = require('./routes/ada-price');
const dbFetch = require('./routes/db-route');
const createUser = require('./routes/create-user');

app.use((express.static("./public")))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/coin-data/get', coinData);
app.use('/api/search-coin/get/', searchToken);
app.use('/api/ada-price/get', adaPrice);
app.use('/api/db-fetch/get', dbFetch);
app.use('/api/create-user/post', createUser);


app.listen(3000, () => {
  console.log("It's alive HAUHAHUAHUAHUA!!!!")
})

// in the future this object will be added to a database but for
// learning purposes atm

let userData = {
  user: []
}

// look at how to specify we are using a post request in our back-end
// how does the node server know this is a post request we are calling for
// how does the node server know we want a get request, read up on it