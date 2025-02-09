// require("dotenv").config();
// const axios = require("axios");
// const db = require('../db');
import axios from 'axios';
import db from '../db.js'


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
const tt_api_percent = 'https://openapi.taptools.io/api/v1/token/prices/chg?unit=';
const percent_params = '&timeframes=1h,24h,7d,30d'

// will refactor function to use axios.all two request two different apis
const getSearchToken = (request, response) => {
    const { unit } = request.query;
    api_input_param = unit;
    axios.defaults.headers.common = {
        "X-API-Key": process.env.TAPTOOLS_API_KEY,
    };

    const basicData = axios.get(tt_api_search_coin + api_input_param);
    const percentData = axios.get(tt_api_percent + api_input_param + percent_params);

    return Promise.all([basicData, percentData])
        .then((res) => {
            const dataBasic = response.json({
                dataBasic: res[0].data,
                dataPercent: res[1].data
            });
        })
        .catch((err) => {
            console.log("getSearchToken promise err: " + err)
        })

    // axios
    //     .get(tt_api_search_coin + api_input_param)
    //     .then((res) => {
    //         const searchedTokenData = response.json(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err + " second api controller");
    //     })
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
        })
        .catch((err) => {
            console.log(err + " third api controller");
        })
}

export { getCoinData, getSearchToken, getAdaPrice };
// module.exports = {
//     getCoinData,
//     getSearchToken,
//     getAdaPrice,
// }
