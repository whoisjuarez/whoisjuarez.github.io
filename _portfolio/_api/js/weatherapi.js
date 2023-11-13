console.log("js/weatherapi.js is loaded!");

async function getWeather(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
};

const main = document.querySelector('main');
const footer = document.querySelector('footer');
const tempArray = ['temp_min', 'temp', 'temp_max'];

function displayWeather(data){
    // section - city
    let section_city = document.createElement('section');
    section_city.classList.add('city');
    let city_name = document.createElement('h3');
    city_name.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}, ${data.sys.country}`;
    section_city.appendChild(city_name);
    main.appendChild(section_city);

    // section - weather description
    let section_weather = document.createElement('section');
    section_weather.classList.add('weather-info');

    // div weather icon
    let weather_icon = document.createElement('div');
    if (data.weather[0].main == "Rain") {
        weather_icon.weather_icon.innerHTML = `<div>< class="fa-solid fa-cloud-showers-heavy"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#FC57FC';
    
    } else if (data.weather[0].main == "Thunderstorm") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-cloud-bolt"></i></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#A557FC';

    } else if (data.weather[0].main == "Snow") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-snowflake"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#7EC4E2';

    } else if (data.weather[0].main == "Clouds") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-cloud"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#7F97BB';

    } else if (data.weather[0].main == "Mist") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-smog"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#DCD1E4';

    } else if (data.weather[0].main == "Haze") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-smog"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#FFDC98';

    } else if (data.weather[0].main == "Fog") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-smog"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#DCE0BD';

    } else if (data.weather[0].main == "Drizzle") {
        weather_icon.innerHTML = `<div><i class="fa-solid fa-cloud-rain"></i></div>`;
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#7FBABB';

    } else if (data.weather[0].main == "Clear") {
        let time_day = new Date().getHours();
        if (time_day >= 5.5 && time_day <= 20.5) {
            weather_icon.innerHTML = `<div><i class="fa-solid fa-sun"></i></div>`;
        } else {
                weather_icon.innerHTML = `<div><i class="fa-solid fa-moon"></i></div>`;
            }
        weather_icon.classList.add('weather-icon');
        section_weather.appendChild(weather_icon);
        document.body.style.backgroundColor = '#52bfff';
    }

    // div weather name
    let weather_name = document.createElement('div');
    weather_name.classList.add('weather-name');
    weather_name.innerHTML = `<div>${data.weather[0].main}</div>`;
    section_weather.appendChild(weather_name);

    // div weather description
    // let weather_description = document.createElement('div');
    // weather_description.classList.add('weather-desc');
    // weather_description.innerHTML = data.weather[0].description;
    // section_weather.appendChild(weather_description);

    main.appendChild(section_weather);

    // temperature - using array line 16
    let section_temp = document.createElement('section');
    section_temp.classList.add('show-temp');

    let mainWeather = data.main;

    // div with temps
    for (i=0; i<tempArray.length; i++){
        let div = document.createElement('div');
        if (tempArray[i] == "temp_min") {
            div.innerHTML = `<i class="fa-solid fa-temperature-arrow-down"></i> ${Math.round(
                mainWeather[tempArray[i]]
            )}ºC`;
        }
        else if (tempArray[i] == "temp_max") {
            div.innerHTML = `<i class="fa-solid fa-temperature-arrow-up"></i> ${Math.round(
                mainWeather[tempArray[i]]
            )}ºC`;
        }
        else {
            div.innerHTML = `${Math.round(mainWeather[tempArray[i]])}ºC`;
        }
        div.classList.add(tempArray[i]);
        section_temp.appendChild(div);
    }

    // Feels like
    let feels_like = document.createElement('div');
    feels_like.classList.add('feels-like');
    feels_like.innerHTML = `Feels like ${Math.round(mainWeather.feels_like)}°C`;
    section_temp.appendChild(feels_like);
    main.appendChild(section_temp);

    //  Section - Humidity and wind
    let section_extraInfo = document.createElement('section');
    section_extraInfo.classList.add('extra-info');

    // div humidity
    let humidity = document.createElement('div');
    humidity.classList.add('humidity');
    humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${mainWeather.humidity}%`;
    section_extraInfo.appendChild(humidity);

    // div wind
    let wind = document.createElement('div');
    wind.classList.add('wind');
    wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(data.wind.speed)} m/s`;
    section_extraInfo.appendChild(wind);

    // div visibility
    let visib = document.createElement('div');
    visib.classList.add('visib');
    visib.innerHTML = `<i class="fa-solid fa-eye"></i> ${data.visibility/1000} km`;
    section_extraInfo.appendChild(visib);

    // div time
    let time = document.createElement('div');
    time.classList.add('time');
    // Convert Unix timestamp to Date object
    let date = new Date(data.dt * 1000);
    // Get hours and minutes from the Date object
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // Format the time string
    let timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    time.innerHTML = `<i class="fa-solid fa-clock"></i> ${timeString}`;
    section_extraInfo.appendChild(time);

    main.appendChild(section_extraInfo);


    // footer
    let section_menu = document.createElement('section');
    section_menu.classList.add('footer');
    
    // div search
    let search = document.createElement('div');
    search.classList.add('search');
    search.innerHTML = `<i class="fa-solid fa-magnifying-glass-location"></i>`;
    section_menu.appendChild(search);

    // div menu
    let menu = document.createElement('div');
    menu.classList.add('menu');
    menu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    section_menu.appendChild(menu);

    // div info
    let info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `<i class="fa-solid fa-circle-question"></i>`;
    section_menu.appendChild(info);

    footer.appendChild(section_menu);
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){
    console.log(position);
    console.info(position.coords.latitude, position.coords.longitude);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=af3c0b0edff1554c67366f907861b6c8&units=metric`;
    getWeather(url);
}

getPosition();

    // console.log(data);
    // console.log(data.name)
    // console.log(data.main.temp);
    // console.log(data.weather[0].description);

    // api key: af3c0b0edff1554c67366f907861b6c8
// url = 'https://api.openweathermap.org/data/2.5/weather?lat=45.508888&lon=-73.561668&appid=af3c0b0edff1554c67366f907861b6c8&units=metric';