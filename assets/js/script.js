var apiKey = '7e32574f3f8ef265a11de62bb2b5d0de';


function searchWeatherTest (location) {
    var inputArea = document.querySelector('#city-input').value;
    var cityLocation = inputArea
    var searchbtn = document.querySelector('#searchbutton')


    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    
    fetch
    ( `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&units=metric&appid=${apiKey}`)
    .then(function (response){
        return response.json()
    }).then(function (data){
        console.log('weather object ',data)

        var lat = data.coord.lat
        var lon =data.coord.lon
        renderWeather(lat, lon);
        
    })
} 

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
        
        
    })
    
}



document.querySelector('#searchbutton').addEventListener('click', searchWeatherTest);




