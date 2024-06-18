const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=$$$$$$$$$`;
const priceApi = `https://api.coingecko.com/api/v3/simple/price?ids=pacmoon&vs_currencies=usd&include_market_cap=true`;
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const hamburger = document.getElementById("hamburger");
const blastPrice = document.getElementById("blast-price");
const tokenStats = document.getElementById("token-stats");
const supplyRow = document.getElementById("circ-supply");

//create object placeholder for storing and updating tokens
//creating a list that lets me rearrange the order for token marketcap
tokenList = [
  {
    id: 0,
    name: "name",
    "market-cap": 1,
    "24h": 24,
    volume: 10,
    liquidity: 10,
    circ: 10,
  },
];

// see search button functionality on example
const search = (data) => {
  fetchData();
  const input = searchInput.value;
  const { result } = data;
  if (data === null) {
    alert("Token does not exist");
    return;
  } else {
    displayTokenData(data);
  }
};

const fetchData = async () => {
  try {
    const resSupply = await fetch(supplyApi);
    const dataSupply = await resSupply.json();
    const resPrice = await fetch(priceApi);
    const dataInfo = await resPrice.json();
    // add new api calls and create function to access tokens object
    searchToken(dataSupply);
    displayTokenData(dataSupply);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const displayTokenData = (data) => {
  const { result } = data;
  tokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${1}</td>
      <td id="price" class="stats">${1}</td>
      <td id="mc" class="stats">${1}</td>
      <td id="24" class="stats">${1}</td>
      <td id="volume" class="stats">${1}</td>
      <td id="liquidity" class="stats">${1}</td>
      <td id="circ-supply" class="stats">${result}</td>
    </tr>
  `;
};
