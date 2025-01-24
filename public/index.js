const searchBtn = document.getElementById("search-button");
const hamburger = document.getElementById("hamburger");
const searchInput = document.getElementById("search-input");
const adaPrice = document.getElementById("ada-price");
// remember to make this element next session
// have to add new html and css for upcoming create user functionality
const createUserInput = document.getElementById("createUser-input");

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

const shorthandMcap = (mcap) => {
  const mcapPlaceValues = mcap.toString().split('');
  if (mcapPlaceValues.length > 7) {
    return mcapPlaceValues.slice(0, mcapPlaceValues.length - 6).join("") + "M";
  } else {
    return mcap;
  }
}

const searchToken = async () => {
  try {
    const data = await fetch(`/api/search-coin/get/?unit=${searchInput.value}`);
    console.log("promise.all bug testing");
    const tokenData = await data.json();
    console.log(tokenData);

    displayTokenData(tokenData);
  } catch (err) {
    console.log(err + " searchToken() bug");
  }
}

const displayTokenData = (json) => {
  // checks if API call didn't find coin to then alert user
  console.log("made it to displayTokenData()");

  if (json.dataBasic.circSupply === undefined) {
    alert(
      "Token search failed! Coin not found. Try a different token address."
    );
    fetchDataResult = false;
    return;
  }

  /* reinitalizes variable to true to restart 
  interaction for future use */
  fetchDataResult = true;

  const name = json.dataBasic.ticker;
  const price = Math.round((json.dataBasic.price * adaDollarValue) * 1000000) / 1000000;
  const marketCap = shorthandMcap(Math.round(json.dataBasic.mcap * adaDollarValue));
  const twentyFourHr = Math.round(json.dataPercent["24h"] * 10000) / 100;
  const oneHr = Math.round(json.dataPercent["1h"] * 10000) / 100;
  const sevenDay = Math.round(json.dataPercent["7d"] * 10000) / 100;
  const thirtyDay = Math.round(json.dataPercent["30d"] * 10000) / 100;
  // const volume = json.market_data.total_volume.usd;
  const circSupply = shorthandMcap(Math.round(json.dataBasic.circSupply));

  searchedTokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats">${name}</td>
      <td id="price" class="stats">$${price}</td>
      <td id="mc" class="stats">$${marketCap}</td>
      <td id="24h" class="stats">${twentyFourHr}%</td>
      <td id="1h" class="stats">${oneHr}%</td>
      <td id="7d" class="stats">${sevenDay}%</td>
      <td id="30d" class="stats">${thirtyDay}%</td>
      <td id="volume" class="stats">$${"TBD"}</td>
      <td id="liquidity" class="stats">$${"TBD"}</td>
      <td id="circ-supply" class="stats">${circSupply}</td>
    </tr>
  `;
};

// find out how to add search input value to back-end server api call
const getHomePageTable = async () => {
  try {
    const jsonData = await fetch("/coin-data");
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
    let marketCap = shorthandMcap(Math.round(json[i].mcap * adaDollarValue));
    // let twentyFourHr = json.market_data.price_change_percentage_24h;
    // let volume = json.market_data.total_volume.usd;
    let circSupply = shorthandMcap(Math.round(json[i].circSupply));

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
    // console.log(fetchDataResult);
  }
});

hamburger.addEventListener("click", getHomePageTable);

/*
  Todays session was to understand where to go next with the Fueli project.
  Although visually the project needs work to be done, most likely with the help of a js framework,
  I would like to add a database to the project to further my understanding with back-end servers.

  So my next goal is to implement either mongoDB or postgreSQL in my project and today I was doing research
  on what technology best suits my needs. However, the main goal will be to implement a database to Fueli.
  During this exploration I will most likely adjust with what we have so far in the Fueli project to welcome the DB.
  I have plans to add an interface to track liqwid portfolios in Fueli after I finish with the basic crypto data aggregation.

  For the data aggregation, I would like a database that will help me with storing
  icons, basic coin data, as well as policyID and hexnames of coins being searched for. All this will be figured out
  as I learn how to implement a DB. Hopefully tomorrow, 10/03/2024, we figure out which DB to learn and go from there.
  PS! Dont forget to add some icons to the Fueli site. #Hamburger needs to be an an actual hamburger icon!
*/