const inputbox = document.querySelector('.input-box');
const searchbtn = document.getElementById('searchbtn');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body= document.querySelector('.weather-body');
const place = document.querySelector('.location');

async function checkWeather(city){
    const api_key = '38736de1b1ef79f1c03857a4240addbc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404' || city === ''){
        location_not_found.style.display = 'flex';
        weather_body.style.display = 'none';
        inputbox.value = '';
        return;
    }

    weather_body.style.display = 'flex';
    location_not_found.style.display = 'none';

    console.log(weather_data);

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

    desc.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    place.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${weather_data.name}, ${weather_data.sys.country}`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "cloud1.png";
            break;
        case 'Clear':
            weather_img.src = "clear1.png";
            break;
        case 'Rain':
            weather_img.src = "rain1.png";
            break;
        case 'Mist':
            weather_img.src = "mist1.png";
            break;
        case 'Snow':
            weather_img.src = "snow1.png";
            break;
        case 'Haze':
            weather_img.src = "haze1.png";
            break;
    }
    inputbox.value = '';

}

searchbtn.addEventListener('click',()=>{
    checkWeather(inputbox.value);
})
document.addEventListener('keypress',(e)=>{
    if(e.key === "Enter"){
        // console.log('Enter Pressed');
        checkWeather(inputbox.value);
    }
})
