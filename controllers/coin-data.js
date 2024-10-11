require("dotenv").config();
const axios = require("axios");
const { response } = require("express");

const tt_api_coin_by_mc = 'https://openapi.taptools.io/api/v1/token/top/mcap';
const api_params = '?type=mcap&page=1&perPage=20'

/* learning postgres but on the to do list is adding a controller function
that calls upon two API's specifically in the search token function so i can add the 
percentage change to the table values */

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

const tt_api_search_coin = 'https://openapi.taptools.io/api/v1/token/mcap?unit=';
let api_input_param = '';

// will refactor function to use axios.all two request two different apis
const getSearchToken = (request, response) => {
    const { unit } = request.query;
    api_input_param = unit;
    axios.defaults.headers.common = {
        "X-API-Key": process.env.TAPTOOLS_API_KEY,
    };
    axios
        .get(tt_api_search_coin + api_input_param)
        .then((res) => {
            const searchedTokenData = response.json(res.data);
        })
        .catch((err) => {
            console.log(err + " second api controller");
        })
}

const CMC_API = " https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=2010";

const getAdaPrice = (request, response) => {
    axios.defaults.headers.common = {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    };
    axios
        .get(CMC_API)
        .then((res) => {
            const adaPrice = response.json(res.data);
            console.log("made it to getAdaPrice() controller");
        })
        .catch((err) => {
            console.log(err + " third api controller");
        })
}
module.exports = {
    getCoinData,
    getSearchToken,
    getAdaPrice
}
