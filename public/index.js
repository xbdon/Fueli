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
let adaDollarValue = 0;

const getAdaPrice = async () => {
  try {
    const data = await fetch('/api/ada-price/get');
    const adaData = await data.json();

    adaDollarValue = adaData.data[2010].quote.USD.price;
    adaPrice.innerHTML += ` ${Math.round(adaData.data[2010].quote.USD.price * 1000) / 1000}`;
  } catch (err) {
    console.log(err + " getAdaPrice() bug");
  }
}

getAdaPrice();

// tmw will work on this function that abbreviates token marketcaps
const shorthandMcap = async (mcap) => {
  const mcapPlaceValues = mcap.split('');
  if (mcapPlaceValues.length > 7) {
    return mcapPlaceValues.slice(0, mcapPlaceValues.length - 6);
  }
  return mcap;
}

const searchToken = async () => {
  try {
    console.log(searchInput.value);
    const data = await fetch(`/api/search-coin/get/?unit=${searchInput.value}`);
    const tokenData = await data.json();

    displayTokenData(tokenData);
  } catch (err) {
    console.log(err + " searchToken() bug");
  }
}

// const fetchData = async () => {
//   try {
//     const jsonData = await fetch("/api/coin-data/get");
//     const data = await jsonData.json();

//     displayTokenData(data);
//   } catch (err) {
//     console.log(err + " trouble obtaining data from api");
//   }
// };

const displayTokenData = (json) => {
  // checks if API call didn't find coin to then alert user
  console.log("made it to displayTokenData()");

  if (json === undefined) {
    alert(
      "Token search failed! Coin not found. Try a different token address."
    );
    fetchDataResult = false;
    return;
  }

  /* reinitalizes variable to true to restart 
  interaction for future use */
  fetchDataResult = true;

  const name = json.ticker;
  const price = Math.round((json.price * adaDollarValue) * 1000000) / 1000000;
  const marketCap = Math.round(json.mcap * adaDollarValue);
  // const twentyFourHr = json.market_data.price_change_percentage_24h;
  // const volume = json.market_data.total_volume.usd;
  const circSupply = Math.round(json.circSupply);

  searchedTokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${name}</td>
      <td id="price" class="stats">$${price}</td>
      <td id="mc" class="stats">$${marketCap}</td>
      <td id="24" class="stats">%${"TBD"}</td>
      <td id="volume" class="stats">$${"TBD"}</td>
      <td id="liquidity" class="stats">$${"TBD"}</td>
      <td id="circ-supply" class="stats">${circSupply}</td>
    </tr>
  `;
};

// find out how to add search input value to back-end server api call
const getHomePageTable = async () => {
  try {
    const jsonData = await fetch("/api/coin-data/get");
    const data = await jsonData.json();
    console.log("start up test")
    displayHPTable(data);
  } catch (err) {
    console.log(err + " trouble obtaining data from api HOMEPAGE");
  }
}

const displayHPTable = (json) => {
  console.log("in display hp table funciton now")
  console.log(json[0].ticker);
  if (json[0] === undefined) {
    //must complete after basic function ready
    console.log("Will add an error message to front-end");
    fetchDataResult = false;
    return;
  }

  console.log("passed if statement")

  /* reinitalizes variable to true to restart 
  interaction for future use */
  fetchDataResult = true;

  const row = 20;
  for (let i = 0; i < row; i++) {
    let name = json[i].ticker;
    let price = Math.round((json[i].price * adaDollarValue) * 1000000) / 1000000;
    let marketCap = Math.round(json[i].mcap * adaDollarValue);
    // let twentyFourHr = json.market_data.price_change_percentage_24h;
    // let volume = json.market_data.total_volume.usd;
    let circSupply = Math.round(json[i].circSupply);

    tokenStats.innerHTML += `
      <tr>
        <td id="token-name${i}" class="stats">${name}</td>
        <td id="price${i}" class="stats">$${price}</td>
        <td id="mc${i}" class="stats">$${marketCap}</td>
        <td id="24-${i}" class="stats">%${name}</td>
        <td id="volume${i}" class="stats">$${name}</td>
        <td id="liquidity${i}" class="stats">$${"TBD"}</td>
        <td id="circ-supply${i}" class="stats">${circSupply}</td>
      </tr>
    `;
  }
}

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
    searchToken().then(() => {
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

hamburger.addEventListener("click", getHomePageTable);

// did we finally get it right progresssssss 
// git branches take some work to understand like this exercise

// learning how to use git
// just more reassurance

/* tomorrow we work on branches and to see if we can have
all branches on github repo to reflect on 
vscode(local? or remote? find out!) */

/* figure out how to get rid of license and readme
 changes in local and not push those changes to repo */