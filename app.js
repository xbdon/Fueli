const express = require("express");
const app = express();
const coinData = require('./routes/coin-data');

app.use((express.static("./public")))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/coin-data/get', coinData);
app.use('/api/search-coin/get', coinData);

app.listen(3000, () => {
  console.log("It's alive HAUHAHUAHUAHUA!!!!")
})
