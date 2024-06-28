import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=${process.env.BLASTSCAN_API_KEY}`;
const priceApi = `https://api.coingecko.com/api/v3/simple/token_price/blast?contract_addresses=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

export const fetchData = async (load) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.CG_API_KEY,
      },
    };

    const jsonPrice = await fetch(priceApi, options);
    const resPrice = await jsonPrice.json();

    const jsonSupply = await fetch(supplyApi);
    const resSupply = await jsonSupply.json();

    load(resPrice, resSupply);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const app = express();

app.use(express.static(path.join(process.cwd() + "/public")));

app.use((req, res) => {
  res.status(404);
  res.send(`<h1>Error 404: Resource not found</h1>`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
