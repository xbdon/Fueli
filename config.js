export const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=${process.env.BLASTSCAN_API_KEY}`;
export const priceApi = `https://api.coingecko.com/api/v3/simple/token_price/blast?contract_addresses=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

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
