var apiKey = "7e32574f3f8ef265a11de62bb2b5d0de";

//new function, renders the buttons from local storage on refresh.
//get cities from local storage.
//parse cities into an array.
//call create button loop with parsed cities.
//call this new fucntion - at top level. 

//gets the current day =============================================================================================================

function searchWeatherTest(location) {
  var cityLocation = document.querySelector("#city-input").value.toLowerCase().trim();

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&units=metric&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather object ", data);
      
      document.querySelector(".cityinner").innerHTML = cityLocation;
      var localCities = localStorage.getItem("cities");

      if (localCities) {
        var parsedLocalCities = JSON.parse(localCities);
        parsedLocalCities.push({city: cityLocation, coords: data.coord});
        localStorage.setItem("cities", JSON.stringify(parsedLocalCities));
        createButtonLoop(parsedLocalCities);
      } else {
        var citiesArr = [];
        citiesArr.push({city: cityLocation, coords: data.coord});
        localStorage.setItem("cities", JSON.stringify(citiesArr));
        createButtonLoop(citiesArr);
      }
      // var lat = data.coord.lat;
      // var lon = data.coord.lon;
      renderWeather(cityLocation.trim());

      

    });
}


function resetBtnList () {
  document.querySelector(".resultscontainer").innerHTML = '';
}

function createButtonLoop(citiesData) {
  resetBtnList();
  for (var i = 0; i < citiesData.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.classList.add("place");
    historyBtn.innerHTML = citiesData[i].city;
    historyBtn.addEventListener("click", (event) => {
      document.querySelector(".cityinner").innerHTML = event.target.textContent.trim();
      renderWeather(event.target.textContent.trim().toLowerCase());
    });
    document.querySelector(".resultscontainer").appendChild(historyBtn);
  }
}

function renderWeather(cityName) {
  console.log('renderWeather');
  var localCities = localStorage.getItem("cities");
  var parsedLocalCities = JSON.parse(localCities);
  var currentCity = parsedLocalCities.filter((cityObj) => {
    return cityObj.city === cityName
  })[0]
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.coords.lat}&lon=${currentCity.coords.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather data 2: ", data);

      var icon = document.createElement("img");
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
      );

      document
        .querySelector(".currentIcon")
        .removeChild(
          document.querySelector(".currentIcon").getElementsByTagName("img")[0]
        );
      document.querySelector(".currentIcon").appendChild(icon);

      document.querySelector(".currentTemp").textContent =
        "Temperature: " + data.current.temp + " ℃";
      document.querySelector(".currentWind").textContent =
        "Windspeed: " + data.current.wind_speed + "M/s";
      document.querySelector(".currentHumid").textContent =
        "Humidity: " + data.current.humidity + "%";
      document.querySelector(".currentUV").textContent =
        "UV Index: " + data.current.uvi;

      var dtCode = data.current.dt;
      var time = moment.unix(dtCode).format("DD-MM-YYYY");
      document.querySelector(".currentDate").innerHTML = ": " + time;

      // ====================================================================================================== update to forecast not current days

      var icon = document.createElement("img");
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
      );
      document
        .querySelector(".iconf1")
        .removeChild(
          document.querySelector(".iconf1").getElementsByTagName("img")[0]
        );
      document.querySelector(".iconf1").appendChild(icon);
      document.querySelector(".tempf1").textContent =
        "Temperature: " + data.current.temp + " ℃";
      document.querySelector(".windf1").textContent =
        "Windspeed: " + data.current.wind_speed + "M/s";
      document.querySelector(".humidf1").textContent =
        "Humidity: " + data.current.humidity + "%";

      // ==============================================================================================================================
    });
}

console.log(localStorage);

function clearstorage() {
  localStorage.clear();
  window.location.reload();
}

document
  .querySelector("#searchbutton")
  .addEventListener("click", searchWeatherTest);
document.querySelector("#clear").addEventListener("click", clearstorage);
