var apiKey = "7e32574f3f8ef265a11de62bb2b5d0de";

//gets the current day =============================================================================================================

function searchWeatherTest(location) {
  var inputArea = document.querySelector("#city-input").value;
  var cityLocation = inputArea;
  var searchbtn = document.querySelector("#searchbutton");
  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&units=metric&appid=${apiKey}`
    )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather object ", data);
      var cityName = (document.querySelector(".cityinner").innerHTML =
      data.name);
      
      localStorage.setItem('cityName', cityName);
      
      
      
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        renderWeather(lat, lon);
        
        var historyBtn = document.createElement("button");
        historyBtn.classList.add("place");
        document.querySelector(".resultscontainer").appendChild(historyBtn);
        var savedSearch = localStorage.getItem("cityName");
        historyBtn.textContent = savedSearch;
      });
      
      
      
  }
  
  // gets the 5 day fore cast =======================================================================================================

function renderWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
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

      
      // var icon = document.createElement('img')
      // icon.setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png` )
      // document.querySelector('.iconf1').appendChild(icon);
      // document.querySelector('.tempf1').textContent='Temperature: ' + data.current.temp + ' ℃';
      // document.querySelector('.windf1').textContent='Windspeed: ' + data.current.wind_speed + 'M/s';
      // document.querySelector('.humidf1').textContent='Humidity: ' + data.current.humidity + '%';

      // ==============================================================================================================================
    });
}

function clearstorage () {
    localStorage.clear()
    window.location.reload();
  }

document.querySelector("#searchbutton").addEventListener("click", searchWeatherTest);
document.querySelector('#clear').addEventListener('click', clearstorage)

