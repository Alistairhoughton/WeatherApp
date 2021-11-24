var apiKey = '7e32574f3f8ef265a11de62bb2b5d0de';

//gets the current day =============================================================================================================

function searchWeatherTest (location) {
    var inputArea = document.querySelector('#city-input').value;
    var cityLocation = inputArea
    var searchbtn = document.querySelector('#searchbutton');
    
    fetch
    ( `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&units=metric&appid=${apiKey}`)
    .then(function (response){
        return response.json()
    }).then(function (data){
        console.log('weather object ',data)
        document.querySelector('.cityinner').innerHTML=data.name

        var lat = data.coord.lat
        var lon =data.coord.lon
        renderWeather(lat, lon);

        
        
    })
} 

// gets the 5 day fore cast =======================================================================================================

function renderWeather (lat, lon) {
  
    fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`

    

    ).then(function (response){
        return response.json()
    }).then(function (data){
        console.log('weather data 2: ', data)

        var icon = document.createElement('img')
        icon.setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png` )
        document.querySelector('.currentIcon').appendChild(icon);
        document.querySelector('.currentTemp').textContent='Temperature: ' + data.current.temp + ' ℃';
        document.querySelector('.currentWind').textContent='Windspeed: ' + data.current.wind_speed + 'M/s';
        document.querySelector('.currentHumid').textContent='Humidity: ' + data.current.humidity + '%';
        document.querySelector('.currentUV').textContent='UV Index: ' + data.current.uvi;
        document.querySelector('.currentDate').innerHTML=' ' +data.current.dt;

        var time = moment(1382086394000).format("DD-MM-YYYY h:mm:ss");
        
        // var icon = document.createElement('img')
        // icon.setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png` )
        // document.querySelector('.iconf1').appendChild(icon);
        // document.querySelector('.tempf1').textContent='Temperature: ' + data.current.temp + ' ℃';
        // document.querySelector('.windf1').textContent='Windspeed: ' + data.current.wind_speed + 'M/s';
        // document.querySelector('.humidf1').textContent='Humidity: ' + data.current.humidity + '%';
        
        
    })
    
}



document.querySelector('#searchbutton').addEventListener('click', searchWeatherTest);




