const searchBtn = document.getElementById("search-button");
const hamburger = document.getElementById("hamburger");
const searchInput = document.getElementById("search-input");
const adaPrice = document.getElementById("ada-price");

const searchedTokenTable = document.getElementById("searched-token-table");
const searchedTokenStats = document.getElementById("searched-token-stats");
const closeBtn = document.getElementById("close-button");

const mainTable = document.getElementById("token-table");
const tokenStats = document.getElementById("token-stats");

const watchlist = document.getElementById("watchlist");
const watchlistStats = document.getElementById("watchlist-stats");
const watchlistBtn = document.getElementById("watchlist-button");
const mainTableBtn = document.getElementById("main-table-button");

let token = localStorage.getItem('token');
console.log(token);

let mostRecentSearch;

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
    const tokenData = await data.json();
    if (tokenData) { mostRecentSearch = searchInput.value };
    displayTokenData(tokenData);
  } catch (err) {
    console.log(err + " searchToken() bug");
  }
}

const displayTokenData = (json) => {
  // checks if API call didn't find coin to then alert user
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


  // need to add a template literal to decide whether save-button or unsave-button appears
  searchedTokenStats.innerHTML = `
    <tr>
      <td id="token-name" class="stats"><button id="save-button" <span class="material-symbols-outlined">star</span></button><button id="unsave-button">Unsave</button>  ${name}</td>
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

// check if coin is saved to the watchlist already
const isCoinSaved = async () => {
  try {
    const coinBool = await fetch(`/check-coin/${mostRecentSearch}`)
    const bool = await coinBool.json()
    console.log(bool)
    return bool
  } catch (err) {
    console.log(err)
  }
}

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
    console.log("displayHpTable(), arg is undefined");
    fetchDataResult = false;
    return;
  }

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
  }
});

hamburger.addEventListener("click", getHomePageTable);

// this saveBtn functionality will only pertain to the searchedTokenTable for now

const saveCoin = async (e) => {
  if (e.target === document.getElementById('save-button') && token !== undefined && mostRecentSearch !== undefined) {
    const coinTicker = document.getElementById('token-name').textContent;

    const data = {
      ticker: coinTicker,
      coinId: mostRecentSearch
    }

    console.log(data);
    const res = await fetch('/user-functions/save-coin',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": token
        },
        body: JSON.stringify(data)
      });

    const response = await res.json()
    if (response.outcome === "Successful") {
      switchToUnsaveBtn()
    } else {
      console.log("response from back-end controller unsuccessful")
    }

  } else {
    console.log("saveCoin function edgecases did not pass or saveBtn was not pressed")
    return
  }
}

// function for switching save button to an unsave button
const switchToUnsaveBtn = () => {
  const saveBtn = document.getElementById("save-button");
  const unsaveBtn = document.getElementById("unsave-button");

  saveBtn.style.display = "none";
  saveBtn.style.visibility = "hidden";

  unsaveBtn.style.display = "block";
  unsaveBtn.style.visibility = "visible";
}

document.addEventListener("click", saveCoin);

// function to call getWatchlist api and generate data in watchlist table

const getWatchlist = async () => {
  try {
    const data = await fetch('/user-functions/getWatchlist', {
      headers: {
        "Authorization": token
      }
    });
    const watchlist = await data.json();
    switchToWatchlist();
    displayWatchlist(watchlist);
  } catch (err) {
    console.log(err);
  }
}

// add a function below to use at the end of getWatchlist that displays the watchlist coin data
const displayWatchlist = (json) => {
  if (json[0].ticker === undefined) {
    console.log("displayWatchlist() arg equals undefined, user may not have saved any coins!")
    return
  }

  for (let i = 0; i < json.length; i++) {

    // ticker keys' values must remove first 12 characters because (star  ) will be a part of every value due to the structure of the html
    let ticker = json[i].ticker.slice(12);

    // will be used to get data of coin in the future depending on Taptools api constraints
    let coinId = json[i].coin_id;

    watchlistStats.innerHTML += `
      <tr>
        <td id="token-name${i}" class="stats">${ticker}</td>
        <td id="price${i}" class="stats">$${"TBD"}</td>
        <td id="mc${i}" class="stats">$${"TBD"}</td>
        <td id="24-${i}" class="stats">%${"TBD"}</td>
        <td id="volume${i}" class="stats">$${"TBD"}</td>
        <td id="liquidity${i}" class="stats">$${"TBD"}</td>
        <td id="circ-supply${i}" class="stats">${"TBD"}</td>
      </tr>
    `;
  }
}

// adding toggle buttons to switch between watchlist and main token table
const switchToWatchlist = () => {
  mainTable.style.display = "none";
  mainTable.style.visibility = "hidden";

  watchlist.style.display = "block";
  watchlist.style.visibility = "visible";

  // button switches to a main table button that does the vice versa

  watchlistBtn.style.display = "none";
  watchlistBtn.style.visibility = "hidden";

  mainTableBtn.style.display = "inline-block";
  mainTableBtn.style.visibility = "visible";
};

watchlistBtn.addEventListener("click", getWatchlist);

const switchToMainTable = () => {
  watchlistStats.innerHTML = ``;
  watchlist.style.display = "none";
  watchlist.style.visibility = "hidden";

  mainTable.style.display = "block";
  mainTable.style.visibility = "visible";

  // button switches to switches to watchlist button

  mainTableBtn.style.display = "none";
  mainTableBtn.style.visibility = "hidden";

  watchlistBtn.style.display = "inline-block";
  watchlistBtn.style.visibility = "visible";
}

mainTableBtn.addEventListener("click", switchToMainTable);

// function to delete coin from watchlist.

const unsaveCoin = async (e) => {
  try {
    if (e.target === document.getElementById('unsave-button') && token !== undefined && mostRecentSearch !== undefined) {
      const coinTicker = document.getElementById('token-name').textContent;
      const coinId = mostRecentSearch

      console.log(coinTicker, coinId);

      const res = await fetch(`/user-functions/delete-coin/${coinTicker}/${coinId}`,
        {
          method: 'DELETE',
          headers: {
            "Authorization": token
          }
        });

      switchToSaveBtn()

    } else {
      console.log("function call did meet specific criteria, unable to remove coin from watchlist")
    }
  } catch (err) {
    console.log(err)
  }
}

const switchToSaveBtn = () => {
  const saveBtn = document.getElementById("save-button");
  const unsaveBtn = document.getElementById("unsave-button");

  saveBtn.style.display = "block";
  saveBtn.style.visibility = "visible";

  unsaveBtn.style.display = "none";
  unsaveBtn.style.visibility = "hidden";
}

document.addEventListener("click", unsaveCoin)

/*
  We need to handle edge case of:
  when user searches for a coin that they already saved to their watchlist, they should have the option to remove it
  from their watchlist. Also if the saved coin is rendered to the main token table
*/
/*
  PS! Dont forget to add some icons to the Fueli site. #Hamburger needs to be an an actual hamburger icon!
*/