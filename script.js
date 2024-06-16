require("dotenv").config();
console.log(process.env);

console.log("1st");
const blastTokenApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=${process.env.BLASTSCAN_API_KEY}`;
console.log("you made it");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const hamburger = document.getElementById("hamburger");
const blastPrice = document.getElementById("blast-price");
const tokenStats = document.getElementById("token-stats");
const supplyRow = document.getElementById("circ-supply");

const fetchData = async () => {
  try {
    const res = await fetch(blastTokenApi);
    const data = await res.json();
    displayTokenData(data);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const displayTokenData = (data) => {
  const { result } = data;
  tokenStats.innerHTML = `
    <tr>
      <td id="circ-supply" class="stats">${result}</td>
    </tr>
  `;
};

fetchData();
