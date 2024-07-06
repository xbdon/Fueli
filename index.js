import * as fetchData from "./fueli-example/config.js";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const hamburger = document.getElementById("hamburger");
const blastPrice = document.getElementById("blast-price");
const tokenStats = document.getElementById("token-stats");
const supplyRow = document.getElementById("circ-supply");

// const { supplyApi } = import("./fueli-example/config.js");
// const { priceApi } = import("./fueli-example/config.js");
// const { fetchData } = import("./fueli-example/config.js");

//create object placeholder for storing and updating tokens
//creating a list that lets me rearrange the order for token marketcap
// maybe store data of tokens in later versions
//ignore for now
const tokenList = [
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
  // fetchData();
  const input = searchInput.value;
  const { result } = data;
  if (data === null) {
    alert("Token does not exist");
    return;
  } else {
    displayTokenData(data);
  }
};

const displayTokenData = (json, supply) => {
  console.log(json);
  const contractAddress = Object.keys(json)[0];
  const price = json[contractAddress].usd;
  const twentyFourHr = json[contractAddress].usd_24h_change;
  const twentyFourVolume = json[contractAddress].usd_24h_vol;
  const marketCap = json[contractAddress].usd_market_cap;

  const { result } = supply;
  const circSupply = result;

  tokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${1}</td>
      <td id="price" class="stats">${price}</td>
      <td id="mc" class="stats">${marketCap}</td>
      <td id="24" class="stats">${twentyFourHr}</td>
      <td id="volume" class="stats">${twentyFourVolume}</td>
      <td id="liquidity" class="stats">${1}</td>
      <td id="circ-supply" class="stats">${circSupply}</td>
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
fetchData(displayTokenData);
console.log("hgelleoela");






