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
      
      


      // ============================ storage function

      // localStorage.setItem(cityName, cityName)

    //  Alans Method ====================================================================================  

      
      var localCities = localStorage.getItem('cities');

      if (localCities) { 
        var parsedLocalCities = JSON.parse(localCities);
        parsedLocalCities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(parsedLocalCities))
      } else {
        var citiesArr = []
        citiesArr.push(cityName);
        localStorage.setItem('cities', JSON.stringify(citiesArr))
      }


      // get item from storage cities - parse it, loop over the array and make the buttons for each item. 


      // ===============================================================
      
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        renderWeather(lat, lon);
        

        // =================================================== my working function

        // var historyBtn = document.createElement("button");
        // historyBtn.classList.add("place");
        // document.querySelector(".resultscontainer").appendChild(historyBtn);
        // var savedPlace = localStorage.getItem(cityName);
        // historyBtn.textContent = savedPlace;

        // ====================================================== testing below

        JSON.parse(localStorage.getItem(citiesArr));
        
        function createbuttonloop() {
          for (var i = 0; i < citiesArr.length; i++) {
            var historyBtn = document.createElement("button");
            historyBtn.classList.add("place");
            historyBtn.innerHTML = citiesArr[i];
            document.querySelector(".resultscontainer").appendChild(historyBtn);
          }
          historyBtn.addEventListener("click", () => { 
            localStorage.getItem(cityName) ;
            renderWeather(lat, lon);
            var cityName = (document.querySelector(".cityinner").innerHTML =
            data.name);
          });
        }
        createbuttonloop()
      });
        
        // ================================================== event listener
        


        // ================================================== event listener

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
      
      document.querySelector('.currentIcon').removeChild(document.querySelector('.currentIcon').getElementsByTagName('img')[0]);
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

      
      var icon = document.createElement('img')
      icon.setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png` )
      document.querySelector('.iconf1').removeChild(document.querySelector('.iconf1').getElementsByTagName('img')[0]);
      document.querySelector('.iconf1').appendChild(icon);
      document.querySelector('.tempf1').textContent='Temperature: ' + data.current.temp + ' ℃';
      document.querySelector('.windf1').textContent='Windspeed: ' + data.current.wind_speed + 'M/s';
      document.querySelector('.humidf1').textContent='Humidity: ' + data.current.humidity + '%';

      // ==============================================================================================================================
    });
}

console.log(localStorage);


function clearstorage () {
    localStorage.clear()
    window.location.reload();
  }

document.querySelector("#searchbutton").addEventListener("click", searchWeatherTest);
document.querySelector('#clear').addEventListener('click', clearstorage)

