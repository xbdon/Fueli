const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=$$$$$$$$$`;
const priceApi = `https://api.coingecko.com/api/v3/simple/price?ids=pacmoon&vs_currencies=usd&include_market_cap=true`;
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const hamburger = document.getElementById("hamburger");
const blastPrice = document.getElementById("blast-price");
const tokenStats = document.getElementById("token-stats");
const supplyRow = document.getElementById("circ-supply");

//create object placeholder for storing and updating tokens
tokens = {
  data: [],
};

const fetchData = async () => {
  try {
    const resSupply = await fetch(supplyApi);
    const dataSupply = await resSupply.json();
    const resPrice = await fetch(priceApi);
    const dataInfo = await resPrice.json();
    // add new api calls and create function to access tokens object
    displayTokenData(dataSupply);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

// create an object for token Data
const displayTokenData = (data) => {
  const { result } = data;
  tokenStats.innerHTML = `
    <tr>
      <td id="circ-supply" class="stats">${result}</td>
    </tr>
  `;
};

fetchData();
