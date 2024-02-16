let latitude,longitude


//called on onload 
function start(){
    navigator.geolocation.getCurrentPosition(success,error)
}

//start function calls it when user allow location
function success(prop){
    latitude = prop.coords.latitude
    longitude = prop.coords.longitude
    initial_api_call(longitude,latitude)
}


function initial_api_call(longitude,latitude){
    const apiKey = "30965510cee5b46366685980ce2d5a25";
    const weather_current = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(weather_current)
    .then((response)=>{
        let data = response.json();
        return data
    })
    .then((data)=>{
       all_data = data
    append_data(all_data)
    return all_data
    })
}


function append_data(data){
    document.getElementById("alert").setAttribute("style", "display:none");
    document.getElementById( "cityname").textContent = `Weather of ${data.name}`;
    document.getElementById("current_tem").textContent = `${eval((data.main.temp - 273.15).toFixed())}`;
    document.getElementById("min_temperature").textContent = `min-temperature is: ${eval((data.main.temp_min - 273.15).toFixed())}c`;
    document.getElementById("max_temperature").textContent = `max-temperature is: ${eval((data.main.temp_max - 273.15).toFixed())}c`
    document.getElementById("feels_like").textContent = `feels-like: ${eval((data.main.feels_like - 273.15).toFixed())}c`;

    document.getElementById("wind_speed").textContent = `wind speed: ${eval( (data.wind.speed * 18)/5).toFixed()} km/h`;
    document.getElementById("current_wind").textContent = `${eval((data.wind.speed * 18)/5).toFixed()}`;
    document.getElementById("wind_deg").textContent = `wind deg: ${data.wind.deg}`;
    // document.getElementById('wind_gust').textContent = `wind gust: ${data.wind.gust}`

    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("pressure").textContent = `pressure: ${data.main.pressure}md`;
    document.getElementById("clouds").textContent = `Clouds: ${data.weather[0].description}`;
}


function error(){
    alert('Allow the location');
}
