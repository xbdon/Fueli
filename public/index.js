const searchBtn = document.getElementById("search-button");
const hamburger = document.getElementById("hamburger");
const searchInput = document.getElementById("search-input");
const adaPrice = document.getElementById("ada-price");

const searchedTokenTable = document.getElementById("searched-token-table");
const searchedTokenStats = document.getElementById("searched-token-stats");
const closeBtn = document.getElementById("close-button");

const tokenStats = document.getElementById("token-stats");

/* checks result from fetchData() api call; 
if no coin is found from search input,
then value changes to false*/
let fetchDataResult = true;

const fetchData = async () => {
  try {
    const jsonData = await fetch("/api/coin-data/get");
    const data = await jsonData.json();

    displayTokenData(data);
  } catch (err) {
    console.log(err + " trouble obtaining data from api");
  }
};

const displayTokenData = (json) => {
  // checks if API call didn't find coin to then alert user
  console.log("sheeesh")
  if (json[0] === undefined) {
    alert(
      "Token search failed! Coin not found. Try a different token address."
    );
    fetchDataResult = false;
    return;
  }

  /* reinitalizes variable to true to restart 
  interaction for future use */
  fetchDataResult = true;

  const name = json[0].ticker;
  const price = json[0].price;
  const marketCap = json[0].mcap;
  // const twentyFourHr = json.market_data.price_change_percentage_24h;
  // const volume = json.market_data.total_volume.usd;
  const circSupply = json[0].circSupply;

  searchedTokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${name}</td>
      <td id="price" class="stats">$${price}</td>
      <td id="mc" class="stats">$${marketCap}</td>
      <td id="24" class="stats">%${name}</td>
      <td id="volume" class="stats">$${name}</td>
      <td id="liquidity" class="stats">$${"TBD"}</td>
      <td id="circ-supply" class="stats">${circSupply}</td>
    </tr>
  `;
};

const toggleSearchBar = () => {
  searchInput.style.display =
    searchInput.style.display === "block" ? "" : "block";
  searchInput.style.visibility =
    searchInput.style.visibility === "visible" ? "" : "visible";
};

const closeGeneratedTable = () => {
  searchedTokenTable.style.display = "none";
  searchedTokenTable.style.visibility = "hidden";
  closeBtn.style.display = "none";
  closeBtn.style.visibility = "hidden";
  searchInput.style.display = "none";
  searchInput.style.visibility = "hidden";
  searchedTokenStats.innerHTML = "";
};

closeBtn.addEventListener("click", closeGeneratedTable);
searchBtn.addEventListener("click", toggleSearchBar);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData().then(() => {
      if (fetchDataResult === false) {
        return;
      } else {
        toggleSearchBar();
        searchedTokenTable.style.display = "block";
        searchedTokenTable.style.visibility = "visible";
        closeBtn.style.display = "inline";
        closeBtn.style.visibility = "visible";
      }
    });
    console.log(fetchDataResult);
  }
});

// Next work on regex for API values generated
// learning how to use git