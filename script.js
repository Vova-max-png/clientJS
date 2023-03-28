const URL = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=f3d635247f508c161d4332cdbb90121f';

async function send_request(url) {
    return await fetch(url).then(responce => {
        if (responce.ok)
            return responce.json();
        return responce.json().then(() => {
            console.error('Something went wrong!');
        });
    });
}

let button = document.querySelector('button');
let input = document.querySelector('input');
let wind = document.querySelector(".wind");
let wind_deg = document.querySelector(".wind-deg");
let weather = document.querySelector(".weather");
let visibility = document.querySelector(".visibility");

button.addEventListener('click', () => {
    let p = document.querySelector('.temp');
    send_request(`https://api.openweathermap.org/data/2.5/weather?q=${String(input.value)}&appid=f3d635247f508c161d4332cdbb90121f`).then(data => {
        console.log(data);
        p.textContent = String(Math.trunc(data.main.temp - 273,15) + '°');
        wind.textContent = String(data.wind.speed + 'km/h');
        wind_deg.textContent = String(data.wind.deg + '°');
        weather.textContent = String(data.weather[0].main);
        switch (true) {
            case data.visibility > 8000:
                visibility.textContent = String("Good");
                break;
            case data.visibility > 5000:
                visibility.textContent = String("Middle");
                break;
            case data.visibility >= 0:
                visibility.textContent = String("Good");
                break;
        }
    }).catch(err => {
        console.warn("City not found!");
        p.textContent = 'City not found!';
        wind.textContent = '';
        wind_deg.textContent = '';
        weather.textContent = '';
        visibility.textContent = '';
    });
});