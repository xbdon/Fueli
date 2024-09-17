require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

const tt_api_coin_by_mc = 'https://openapi.taptools.io/api/v1/token/top/mcap';
const api_params = '?type=mcap&page=1&perPage=20'

const getCoinData = (request, response) => {
    axios.defaults.headers.common = {
        "X-API-Key": process.env.TAPTOOLS_API_KEY,
    };
    axios
        .get(tt_api_coin_by_mc + api_params)
        .then((res) => {
            const coinData = response.json(res.data);
        })
        .catch((err) => {
            console.log(err + "end game");
        })
    // console.log("controller file");
    // req.headers['x-api-key'] = [process.env.TAPTOOLS_API_KEY]
    // console.log(req.headers + "We made it");
    // res.status(200).json();
}

module.exports = {
    getCoinData
}
