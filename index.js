const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=$$$$$$$`;
const priceApi = `https://api.coingecko.com/api/v3/simple/token_price/blast?contract_addresses=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const hamburger = document.getElementById("hamburger");
const blastPrice = document.getElementById("blast-price");
const tokenStats = document.getElementById("token-stats");
const supplyRow = document.getElementById("circ-supply");

//create object placeholder for storing and updating tokens
//creating a list that lets me rearrange the order for token marketcap
// maybe store data of tokens in later versions
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

// see search button functionality from example
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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "$$$$$$$$$",
      },
    };

    const jsonPrice = await fetch(
      "https://api.coingecko.com/api/v3/simple/token_price/blast?contract_addresses=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true",
      options
    );
    const resPrice = await jsonPrice.json();

    const jsonSupply = await fetch(supplyApi);
    const resSupply = await jsonSupply.json();
    console.log(resPrice + "Hello darkness my old friend");
    displayTokenData(resPrice, resSupply);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const displayTokenData = (json, supply) => {
  const contractAddress = Object.keys(json)[0];
  const { result } = supply;

  tokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${1}</td>
      <td id="price" class="stats">${json[contractAddress].usd}</td>
      <td id="mc" class="stats">${1}</td>
      <td id="24" class="stats">${1}</td>
      <td id="volume" class="stats">${1}</td>
      <td id="liquidity" class="stats">${1}</td>
      <td id="circ-supply" class="stats">${result}</td>
    </tr>
  `;
};

const showOutput = () => {
  searchInput.style.display =
    searchInput.style.display === "block" ? "" : "block";
  searchInput.style.visibility =
    searchInput.style.visibility === "visible" ? "" : "visible";
};

searchBtn.addEventListener("click", showOutput);
fetchData();



