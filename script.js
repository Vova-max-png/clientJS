const URL = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=f3d635247f508c161d4332cdbb90121f';
let button = document.querySelector('button');
let input = document.querySelector('input');
let wind = document.querySelector(".wind");
let wind_deg = document.querySelector(".wind-deg");
let weather = document.querySelector(".weather");
let visibility = document.querySelector(".visibility");
let middle = document.querySelector('.middle-temp');
let min = document.querySelector('.min-temp');
let max = document.querySelector('.max-temp');

async function send_request(url) {
    return await fetch(url).then(responce => {
        if (responce.ok)
            return responce.json();
        return responce.json().then(() => {
            console.error('Something went wrong!');
        });
    });
}

function set_temp(min_t, mid_t, max_t, wind_t, wind_deg_t, weather_t, visibility_t) {
    middle.textContent = String(Math.trunc(mid_t - 273,15) + '°');
    min.textContent = String(Math.trunc(min_t - 273,15) + '°');
    max.textContent = String(Math.trunc(max_t - 273,15) + '°');
    wind.textContent = String(wind_t + 'km/h');
    wind_deg.textContent = String(wind_deg_t + '°');
    weather.textContent = String(weather_t);
    switch (true) {
        case visibility_t > 8000:
            visibility.textContent = String("Good");
            break;
        case visibility_t > 5000:
            visibility.textContent = String("Middle");
            break;
        case visibility_t >= 0:
            visibility.textContent = String("Bad");
            break;
    }
}

function set_not_found() {
    middle.textContent = 'City not found!';
    min.textContent = '';
    max.textContent = '';
    wind.textContent = '';
    wind_deg.textContent = '';
    weather.textContent = '';
    visibility.textContent = '';
}

button.addEventListener('click', () => {
    send_request(`https://api.openweathermap.org/data/2.5/weather?q=${String(input.value)}&appid=f3d635247f508c161d4332cdbb90121f`).then(data => {
        set_temp(
            data.main.temp_min,
            data.main.temp,
            data.main.temp_max,
            data.wind.speed,
            data.wind.deg,
            data.weather[0].main,
            data.visibility
        );
    }).catch(err => {
        console.warn("City not found!");
        set_not_found();
    });
});