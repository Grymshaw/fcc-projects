import "normalize.css";
import "../styles/main.scss";

let baseUrl = 'https://fcc-weather-api.glitch.me/api/current?';
let lat, long;
let domObjects = {};
let weatherJSON = {};

domObjects = cacheDom();
bindEvents();

loadLocation().then((position) => {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let url = `${baseUrl}lat=${lat}&lon=${long}`;
  loadWeather(url).then((data) => {
    setWeatherData(data);
  }).catch((error) => {
    console.log('load weather error: ' + error.message);
  });
}).catch((error) => {
  console.log('load location error: ' + error.message);
});

function loadLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function getLocation() {
  return new Promise((resolve, reject) => {
    let location = navigator.geolocation;
    location.onload = () => {
      resolve(location);
    };
    location.onerror = () => {
      reject(new Error('navigator.geolocation not found'));
    };
  });
}

function loadWeather(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
      resolve(xhr);
    };
    xhr.onerror = () => {
      reject(new Error('Error loading resource at ' + url));
    };

  });
}

function setWeatherData(data) {
  let json = JSON.parse(data.responseText);
  weatherJSON = {
    'main': json.weather[0].main,
    'description': json.weather[0].description,
    'icon': json.weather[0].icon,
    'temp': (json.main.temp).toFixed(1),
    'tempLow': (json.main.temp_min).toFixed(1),
    'tempHigh': (json.main.temp_max).toFixed(1),
    'unit': 'celsius'
  };
  renderDom();
}

function cacheDom() {
    let icon = document.querySelector('.icon');
    let description = document.querySelector('.description--main');
    let descriptionSecondary = document.querySelector('.description--secondary');
    let temp = document.querySelector('.temperature--current');
    let tempHigh = document.querySelector('.temperature--high');
    let tempLow = document.querySelector('.temperature--low');
    let celsiusButton = document.querySelector('.celsius-button');
    let fahrenheitButton = document.querySelector('.fahrenheit-button');

    return {
        'icon': icon,
        'description': description,
        'descriptionSecondary': descriptionSecondary,
        'temp': temp,
        'tempLow': tempLow,
        'tempHigh': tempHigh,
        'celsiusButton': celsiusButton,
        'fahrenheitButton': fahrenheitButton,
    };
}

function renderDom() {
    domObjects.icon.src = weatherJSON.icon;
    domObjects.description.innerHTML = weatherJSON.main;
    domObjects.descriptionSecondary.innerHTML = weatherJSON.description;
    domObjects.temp.innerHTML = 'Current: ' + weatherJSON.temp + '&#176;';
    domObjects.tempLow.innerHTML = 'Low: ' + weatherJSON.tempLow + '&#176;';
    domObjects.tempHigh.innerHTML = 'High: ' + weatherJSON.tempHigh + '&#176;';

    domObjects.celsiusButton.disabled = weatherJSON.unit === 'celsius';
    domObjects.fahrenheitButton.disabled = weatherJSON.unit === 'fahrenheit';
}

function bindEvents() {
    domObjects.celsiusButton.addEventListener("click", changeTempUnits);
    domObjects.fahrenheitButton.addEventListener("click", changeTempUnits);
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5 + 32).toFixed(1);
}

function fahrenheitToCelsius(fehr) {
    return ((fehr - 32) * 5 / 9).toFixed(1);

}

function changeTempUnits() {
    if(weatherJSON.unit === 'celsius') {
        weatherJSON.temp = celsiusToFahrenheit(weatherJSON.temp);
        weatherJSON.tempLow = celsiusToFahrenheit(weatherJSON.tempLow);
        weatherJSON.tempHigh = celsiusToFahrenheit(weatherJSON.tempHigh);
        weatherJSON.unit = 'fahrenheit';
    } else {
        weatherJSON.temp = fahrenheitToCelsius(weatherJSON.temp);
        weatherJSON.tempLow = fahrenheitToCelsius(weatherJSON.tempLow);
        weatherJSON.tempHigh = fahrenheitToCelsius(weatherJSON.tempHigh);
        weatherJSON.unit = 'celsius';
    }
    renderDom();
}
