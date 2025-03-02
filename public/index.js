const searchBtn = document.getElementById("search-button");
const marketCapBtn = document.querySelector(".market-cap");
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

const trendingBtn = document.querySelector(".trending");

let coinIds = []

let token = localStorage.getItem('token');
console.log(token);

let mostRecentSearch = null;

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

  isCoinSaved()
};

// check if coin is saved to the watchlist already
const isCoinSaved = async () => {
  const token = localStorage.getItem('token');

  try {
    if (token) {
      console.log('token exists');
    } else {
      // Handle the case where the token is not found
      return console.log('Token not found in local storage');
    }

    const coinTicker = document.getElementById('token-name').textContent.slice(12)
    console.log(coinTicker)

    // checks if coin exists in the watchlist or not
    const coinBool = await fetch(`/user-functions/check-coin/${mostRecentSearch}/${coinTicker}`, {
      headers: {
        "Authorization": token
      }
    })

    const bool = await coinBool.json()
    const coinExists = bool.coin.coin_exists

    const unsaveBtn = document.getElementById('unsave-button')
    const saveBtn = document.getElementById('save-button')
    console.log(coinExists)

    // if coinExists === 1 (coin is in watchlist db) activate unsaveBtn else activate saveBtn
    if (coinExists === 1) {
      unsaveBtn.style.display = "block";
      unsaveBtn.style.visibility = "visible";

      saveBtn.style.display = "none";
      saveBtn.style.visibility = "hidden";
    } else {
      saveBtn.style.display = "block";
      saveBtn.style.visibility = "visible";

      unsaveBtn.style.display = "none";
      unsaveBtn.style.visibility = "hidden";
    }
  } catch (err) {
    console.log(err)
  }
}

// the start of the main table functionality xxxxxxxxxxxxxxxxxxxxxxxx
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
  // resetting tokenStats so no duplicate values are displayed
  tokenStats.innerHTML = ``;
  // resetting coinIds array so array can be indexed accurately
  coinIds = []
  for (let i = 0; i < row; i++) {
    let coinId = json[i].unit
    let name = json[i].ticker;
    let price = Math.round((json[i].price * adaDollarValue) * 1000000) / 1000000;
    let marketCap = shorthandMcap(Math.round(json[i].mcap * adaDollarValue));
    // let twentyFourHr = json.market_data.price_change_percentage_24h;
    // let volume = json.market_data.total_volume.usd;
    let circSupply = shorthandMcap(Math.round(json[i].circSupply));

    coinIds.push(coinId)

    tokenStats.innerHTML += `
      <tr>
        <td id="coin-id${i}" class="stats"><button id="coinIdBtn${i}" class="copy-id-button">copy</button></td>
        <td id="token-name${i}" class="stats">${name}</td>
        <td id="price${i}" class="stats">$${price}</td>
        <td id="mc${i}" class="stats">$${marketCap}</td>
        <td id="24-${i}" class="stats">%${name}</td>
        <td id="volume${i}" class="stats">$${name}</td>
        <td id="liquidity${i}" class="stats">$${"TBD"}</td>
        <td id="circ-supply${i}" class="stats">${circSupply}</td>
      </tr>
    `;
    chooseBtnMain(i)
  }
}

const chooseBtnMain = async (row_num) => {
  const token = localStorage.getItem('token');

  try {
    if (token) {
      console.log('token exists');
    } else {
      // Handle the case where the token is not found
      return console.log('Token not found in local storage');
    }

    // coinTicker is extracted using row_num arg to get specific token-name,
    //  this will also be used to get specific associated btn
    const coinTicker = document.getElementById(`token-name${row_num}`).textContent;

    // api call checks the db to see if coin is already saved to users watchlist db or not
    const coinBool = await fetch(`user-functions/check-coin-main/${coinTicker}`, {
      headers: {
        'Authorization': token,
      }
    })

    // based off the coinBools result we will add a main table save btn or unsave btn
    const bool = await coinBool.json()
    const coinExists = bool.coin.coin_exists

    const tokenName = document.getElementById(`token-name${row_num}`)
    console.log(coinExists)

    // coin is not in watchlist db if coinExists equals 0
    if (coinExists === 0) {

      tokenName.innerHTML += `<button class="main-table-save" id="save-button${row_num}" <span class="material-symbols-outlined">star</span></button>`

      // creates unsave-button still but hides it
      tokenName.innerHTML += `<button class="main-table-unsave" id="unsave-button${row_num}">Unsave</button>`
      document.getElementById(`unsave-button${row_num}`).style.display = "none"
      document.getElementById(`unsave-button${row_num}`).style.visibility = "hidden"


    } else if (coinExists === 1) {

      tokenName.innerHTML += `<button class="main-table-unsave" id="unsave-button${row_num}">Unsave</button>`

      // creates save-button still but hides it
      tokenName.innerHTML += `<button class="main-table-save" id="save-button${row_num}" <span class="material-symbols-outlined">star</span></button>`
      document.getElementById(`save-button${row_num}`).style.display = "none"
      document.getElementById(`save-button${row_num}`).style.visibility = "hidden"

    } else {
      console.log("chooseBtnMain() did not receive a value for coinExists")
    }

  } catch (err) {
    console.log(err)
  }
}

const copyCoinId = (e) => {
  if (!e.target.classList.contains('copy-id-button')) {
    console.log("we are returning from copyCoinId()")
    return
  }

  const coinIdRow = e.target.id.slice(9)
  const text = coinIds[coinIdRow]
  console.log(text)

  navigator.clipboard.writeText(text)
    .then(() => {
      console.log("Coin id copied to clipboard")
    })
    .catch(err => {
      console.log("Failed to copy text: " + err)
    })
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
  mostRecentSearch = null;
};

marketCapBtn.addEventListener("click", () => {
  const elements = document.querySelectorAll('.tab-clicked');
  elements.forEach(element => {
    element.classList.remove('tab-clicked');
  })
  marketCapBtn.classList.add('tab-clicked')
  getHomePageTable()
});

document.addEventListener("click", copyCoinId)

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

// completed objectives refactored save coin and added coin id column to have access to all coins coin-ids geerated from main table. now we have to incorporate all coins coin-ids
// in our db queries and then have main table unsave btns use unsaveCoin()

const saveCoin = async (e) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Handle the case where the token is not found
    return console.log('Token not found in local storage');
  }

  let data = {
    ticker: null,
    coinId: null
  }

  // variable marker to see if save button was a searched coin or main table coin; 1 is searched. 2 is main table
  let mainSaveClicked = null

  // next we will check if the coin being saved is a searched token or a coin from the generated main table
  if (e.target === document.getElementById('save-button') && mostRecentSearch !== null) {

    data.ticker = document.getElementById('token-name').textContent.slice(12)
    data.coinId = mostRecentSearch
    mainSaveClicked = 1

  } else if (e.target.classList.contains('main-table-save')) {
    // this gets the token ticker associated with the button clicked so we can add it to the data sent to the back-end
    const row_num = e.target.id.slice(11)
    const mainCoinTicker = document.getElementById(`token-name${row_num}`).textContent.slice(0, -10)
    data.ticker = mainCoinTicker
    data.coinId = coinIds[row_num]
    mainSaveClicked = 2

  } else {
    return
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

  console.log(e.target.id.slice(11))

  // if a coin is searched and a main table coin save btn is clicked
  if (response.outcome === "Successful" && mainSaveClicked === 2 && coinIds[e.target.id.slice(11)] === mostRecentSearch) {
    console.log("000")
    switchToUnsaveBtn()
    switchToMainUnsaveBtn(e.target.id.slice(11))

    // if searched coin save btn is clicked and main table is generated; cant use e.target.id cuz searched coin save btn was clicked
  } else if (response.outcome === "Successful" && mainSaveClicked === 1 && coinIds.includes(mostRecentSearch)) {
    console.log("111")
    switchToUnsaveBtn()
    switchToMainUnsaveBtn(coinIds.indexOf(mostRecentSearch))

  } else if (response.outcome === "Successful" && mainSaveClicked === 1) {
    console.log("222")
    switchToUnsaveBtn()

  } else if (response.outcome === "Successful" && mainSaveClicked === 2) {
    console.log("333")
    switchToMainUnsaveBtn(e.target.id.slice(11))
  } else {
    console.log("response from back-end controller unsuccessful")
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

const switchToMainUnsaveBtn = (id) => {
  const saveBtn = document.getElementById(`save-button${id}`);
  const unsaveBtn = document.getElementById(`unsave-button${id}`);

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
  if (json[0] === undefined) {
    console.log("displayWatchlist() arg equals undefined, user may not have saved any coins!")
    return
  }

  for (let i = 0; i < json.length; i++) {

    // after this is done we need to add unsave funcitonality to the main table unsave buttons, after this most of Fuelis main features for now will be done,
    // we should probably organize some of the functions as some of them like the save-coin function could be made more readable and more digestible logic

    let ticker = json[i].ticker;

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
  const token = localStorage.getItem('token');

  if (!token) {
    // Handle the case where the token is not found
    return console.log('Token not found in local storage');
  }

  let coinTicker = null
  let coinId = null

  let mainSaveClicked = null

  if (e.target === document.getElementById('unsave-button') && token !== undefined) {
    // we need to slice here because the token ticker has a the button text in it as well
    coinTicker = document.getElementById('token-name').textContent.slice(12)
    coinId = mostRecentSearch
    mainSaveClicked = 1

  } else if (e.target.classList.contains('main-table-unsave') && token !== undefined) {
    const row_num = e.target.id.slice(13)
    coinTicker = document.getElementById(`token-name${row_num}`).textContent.slice(0, -10)
    coinId = coinIds[row_num]
    mainSaveClicked = 2

  } else {
    return console.log("unsaveCoin() did not meet criteria")
  }

  console.log(`h${coinTicker}h`, coinId);

  try {
    const res = await fetch(`/user-functions/delete-coin/${coinTicker}/${coinId}`,
      {
        method: 'DELETE',
        headers: {
          "Authorization": token
        }
      });

    const response = await res.json()
    console.log("que paso test")

    // if Sc unsave btn clicked and main table coin is equal to mostRecentSearch
    if (response.outcome === "Successful" && mainSaveClicked === 1 && coinIds.includes(mostRecentSearch)) {
      console.log("000")
      switchToSaveBtn()
      switchToMainSaveBtn(coinIds.indexOf(mostRecentSearch))


    } else if (response.outcome === "Successful" && mainSaveClicked === 2 && mostRecentSearch === coinIds[e.target.id.slice(13)]) {
      console.log("111")
      switchToSaveBtn()
      switchToMainSaveBtn(e.target.id.slice(13))

    } else if (response.outcome === "Successful" && mainSaveClicked === 1) {
      console.log("222")
      switchToSaveBtn()

    } else if (response.outcome === "Successful" && mainSaveClicked === 2) {
      console.log("333")
      switchToMainSaveBtn(e.target.id.slice(13))

    } else {
      console.log("response from back-end controller unsuccessful")
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

const switchToMainSaveBtn = (id) => {
  const saveBtn = document.getElementById(`save-button${id}`);
  const unsaveBtn = document.getElementById(`unsave-button${id}`);

  saveBtn.style.display = "block";
  saveBtn.style.visibility = "visible";

  unsaveBtn.style.display = "none";
  unsaveBtn.style.visibility = "hidden";
}

document.addEventListener("click", unsaveCoin)

const getTokensByVolume = async () => {
  try {
    const getData = await fetch('/coin-data/getVolumeData')
    const data = await getData.json()
    console.log(data)
    displayVolume(data)
  } catch (err) {
    console.log(err)
  }
}

const displayVolume = (json) => {
  if (json === undefined) {
    return
  }

  tokenStats.innerHTML = ``
  // later this will be changed to be more dyanmic
  const row = 20;
  // resetting coinIds[] when we refresh table so coin row matches coin in array
  coinIds = []

  for (let i = 0; i < row; i++) {
    let price = Math.round((json[i].price * adaDollarValue) * 1000000) / 1000000
    let ticker = json[i].ticker
    let coinId = json[i].unit
    let volume = shorthandMcap(Math.round(json[i].volume))

    // adds coinId of row of i to same array index so we can easily reference array when we need to get coinId of coins available to user
    coinIds.push(coinId)

    tokenStats.innerHTML += `
      <td id="coin-id${i}" class="stats"><button id="coinIdBtn${i}" class="copy-id-button">copy</button></td>
        <td id="token-name${i}" class="stats">${ticker}</td>
        <td id="price${i}" class="stats">$${price}</td>
        <td id="mc${i}" class="stats">$${"TBD"}</td>
        <td id="24-${i}" class="stats">%${"TBD"}</td>
        <td id="volume${i}" class="stats">$${volume}</td>
        <td id="liquidity${i}" class="stats">$${"TBD"}</td>
        <td id="circ-supply${i}" class="stats">${"TBD"}</td>
    `

    chooseBtnMain(i)
  }
}

trendingBtn.addEventListener("click", () => {
  const elements = document.querySelectorAll('.tab-clicked');
  elements.forEach(element => {
    element.classList.remove('tab-clicked');
  })
  trendingBtn.classList.add('tab-clicked')
  getTokensByVolume()
})

/* 
  objectives for next sesh include:
      -make save and unsave buttons not lose alter position of text when switched between the two
       -add a proper login where credentials must abide by industry login and account creation regex's
       -decide whether giving user watchlist its own tab or wait for more functionality first
       -change button colors to make website more visually appealing
*/
