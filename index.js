// const supplyApi = `https://api.blastscan.io/api?module=stats&action=tokensupply&contractaddress=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&apikey=$$$`;
// const priceApi = `https://api.coingecko.com/api/v3/simple/token_price/blast?contract_addresses=0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

const searchBtn = document.getElementById("search-button");
const hamburger = document.getElementById("hamburger");
const searchInput = document.getElementById("search-input");
const blastPrice = document.getElementById("blast-price");

const searchedTokenTable = document.getElementById("searched-token-table");
const searchedTokenStats = document.getElementById("searched-token-stats");
const closeBtn = document.getElementById("close-button");

const tokenStats = document.getElementById("token-stats");

const fetchData = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "$$$",
      },
    };

    const jsonPrice = await fetch(
      "https://api.coingecko.com/api/v3/coins/blast/contract/" +
        searchInput.value,
      options
    );
    const resData = await jsonPrice.json();

    // const jsonSupply = await fetch(supplyApi);
    // const resSupply = await jsonSupply.json();
    // displayTokenData(resPrice, resSupply);
    displayTokenData(resData);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const displayTokenData = (json) => {
  // const contractAddress = Object.keys(json)[0];
  // const price = json[contractAddress].usd;
  // const twentyFourHr = json[contractAddress].usd_24h_change;
  // const twentyFourVolume = json[contractAddress].usd_24h_vol;
  // const marketCap = json[contractAddress].usd_market_cap;

  // const { result } = supply;
  // const circSupply = result;
  const name = json.id;
  const price = json.market_data.current_price.usd;
  const marketCap = json.market_data.market_cap.usd;
  const twentyFourHr = json.market_data.price_change_percentage_24h;
  const volume = json.market_data.total_volume.usd;
  const circSupply = json.market_data.circulating_supply;

  searchedTokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${name}</td>
      <td id="price" class="stats">${price}</td>
      <td id="mc" class="stats">${marketCap}</td>
      <td id="24" class="stats">${twentyFourHr}</td>
      <td id="volume" class="stats">${volume}</td>
      <td id="liquidity" class="stats">${"TBD"}</td>
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

const closeSearch = () => {
  searchedTokenTable.style.display = "none";
  searchedTokenTable.style.visibility = "hidden";
  closeBtn.style.display = "none";
  closeBtn.style.visibility = "hidden";
  searchInput.style.display = "none";
  searchInput.style.visibility = "hidden";
};

closeBtn.addEventListener("click", closeSearch);
searchBtn.addEventListener("click", showOutput);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
    searchedTokenTable.style.display = "block";
    searchedTokenTable.style.visibility = "visible";
    closeBtn.style.display = "inline";
    closeBtn.style.visibility = "visible";
    showOutput();
  }
});

// notify user when token search fails and clean up DOM interaction associated
// Next work on regex for API values generated


