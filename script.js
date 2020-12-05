let spinner = document.querySelector('.spinner');
let bodyBG = document.querySelector('body');
let userLocation = document.querySelector('h1');
let today = document.querySelector('h2');
let latitude = document.querySelector('.latitude');
let longitude = document.querySelector('.longitude');
let todayTemperature = document.querySelector('.today-weather-temperature');
let clouds = document.querySelector('.clouds');
let feelingTemperature = document.querySelector('.feeling-temperature');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let search = document.querySelector('.search');
let searchField = document.querySelector('.search-field');
let mainImage = document.querySelector('.main-image');
let nextDaytemperature = document.querySelectorAll('.next-day-temperature');
let nextDayWeatherImage = document.querySelectorAll('.next-day-weather-image');
let nextDay = document.querySelectorAll('.next-day');
let tempButtons = document.querySelectorAll('.temp-button');
let lengButtons = document.querySelectorAll('.leng-button');
let searchBtn = document.querySelector('.search-button');
let needToHidden = document.querySelector('.mapboxgl-ctrl-attrib-inner');

//ADD START SITE SETTINGS
let settingsArr = {
  lang: 'EN',
  temp: 'C°'
};
let langArr = ['search', 'Search your city', 'Latitude', 'Longitude', 'fellings like', 'wind', 'kph', 'humidity']
tempButtons[0].classList.add('active-button');
lengButtons[0].classList.add('active-button');


document.addEventListener("DOMContentLoaded", getBackgroundImage);
spinner.addEventListener('click', getWeather && getBackgroundImage);
search.addEventListener('click', searchCity && getWeather);

//ADD LOCATION
async function getLocationInfo() {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=27c0ce9b9a654d53b26a54c268cfa24e&pretty=1&no_annotations=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.dir(data);
}
getLocationInfo()

// TEMPERATURE CHANGE
for (let i = 0; i < tempButtons.length; i++) {
  let tempBtn = tempButtons[i];
  tempBtn.addEventListener('click', activeBtn);
  function activeBtn() {
    tempButtons.forEach(el => {
      el.classList.remove('active-button');
    });
    tempBtn.classList.add('active-button');
  };
};
for (let i = 0; i < tempButtons.length; i++) {
  let tempBtn = tempButtons[i];
  tempBtn.addEventListener('click', tempOnSite);
  function tempOnSite() {
    settingsArr.temp = tempBtn.innerText;
  };
};
for (let i = 0; i < tempButtons.length; i++) {
  let tempBtn = tempButtons[i];
  tempBtn.addEventListener('click', getWeather);
};

//LANGUAGE CHANGE
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', activeBtn);
  function activeBtn() {
    lengButtons.forEach(el => {
      el.classList.remove('active-button');
    });
    lengBtn.classList.add('active-button');
  };
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', langOnSite);
  function langOnSite() {
    settingsArr.lang = lengBtn.innerText;
  };
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', getDate);
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', getLocation);
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', changeArrLanguage);
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', changeLanguageInUI);
};
for (let i = 0; i < lengButtons.length; i++) {
  let lengBtn = lengButtons[i];
  lengBtn.addEventListener('click', getWeather);
};

// ADD RANDOM IMAGE
async function getBackgroundImage() {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=RPAtDW-J_cxV4fQu8Mhwb1fUAy_Y6AWRUI5cWcILFJk';
  const res = await fetch(url);
  const data = await res.json();
  bodyBG.style.backgroundImage = `url(${data.urls.regular})`;
}

// ADD TEMPERATURE
async function getWeather() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=c9dd11d3f0a149ebb94174511200212&q=${addActualCity()}&days=4`;
  const res = await fetch(proxyurl + url);
  const data = await res.json();
  // today
  settingsArr.temp === 'C°' ? todayTemperature.innerText = data.current.temp_c : todayTemperature.innerText = Math.round(+data.current.temp_f);
  clouds.innerText = `${data.current.condition.text}`;
  feelingTemperature.innerText = `${langArr[4]}: ${data.current.feelslike_c}°`;
  wind.innerText = `${langArr[5]}: ${data.current.wind_kph} ${langArr[6]}`;
  humidity.innerText = `${langArr[7]}: ${data.current.humidity}%`;
  mainImage.style.backgroundImage = `url(http:${data.current.condition.icon})`;
  // 1 day later
  settingsArr.temp === 'C°' ? nextDaytemperature[0].innerText = data.forecast.forecastday[0].day.maxtemp_c :
    nextDaytemperature[0].innerText = data.forecast.forecastday[0].day.maxtemp_f;
  nextDayWeatherImage[0].style.backgroundImage = `url(http:${data.forecast.forecastday[0].day.condition.icon})`;
  // 2 day later
  settingsArr.temp === 'C°' ? nextDaytemperature[1].innerText = data.forecast.forecastday[1].day.maxtemp_c :
    nextDaytemperature[1].innerText = data.forecast.forecastday[1].day.maxtemp_f;
  nextDayWeatherImage[1].style.backgroundImage = `url(http:${data.forecast.forecastday[1].day.condition.icon})`;
  // 3 day later
  settingsArr.temp === 'C°' ? nextDaytemperature[2].innerText = data.forecast.forecastday[2].day.maxtemp_c :
    nextDaytemperature[2].innerText = data.forecast.forecastday[2].day.maxtemp_f;
  nextDayWeatherImage[2].style.backgroundImage = `url(http:${data.forecast.forecastday[2].day.condition.icon})`;
  console.log(data);
}

// ADD DATE
function getDate() {
  let now = new Date();
  let weekdaysEnglish = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let weekdaysRussian = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  let monthsEnglish = ['th January', 'th February', 'th March', 'th April', 'th May', 'th June', 'th July', 'th August', 'th September', 'th October', 'th November', 'th December']
  let monthsRussian = ['е Января', 'е Февраля', 'е Марта', 'е Апреля', 'е Мая', 'е Июня', 'е Июля', 'е Августа', 'е Сентября', 'е Октября', 'е Ноября', 'е Декабря']
  function getTodayWeekday() {
    let getTomorrow = (e) => e > 6 ? e - 7 : e;
    let weekdayArr = [
      getTomorrow(now.getDay()),
      getTomorrow(now.getDay() + 1),
      getTomorrow(now.getDay() + 2),
      getTomorrow(now.getDay() + 3)
    ]
    return weekdayArr;
  };
  function months() {
    return settingsArr.lang === 'RU' ? monthsRussian : monthsEnglish;
  };
  function daysNum() {
    return settingsArr.lang === 'RU' ? weekdaysRussian : weekdaysEnglish;
  };
  today.innerText = `${now.getDate()}${months()[now.getMonth()]} ${now.getFullYear()} / ${daysNum()[getTodayWeekday()[0]]}`;
  nextDay[0].innerText = daysNum()[getTodayWeekday()[1]];
  nextDay[1].innerText = daysNum()[getTodayWeekday()[2]];
  nextDay[2].innerText = daysNum()[getTodayWeekday()[3]];
}

//ADD LANGUAGE SETTING
function changeArrLanguage() {
  if (settingsArr.lang === 'RU') {
    langArr = ['поиск', 'Введите ваш город', 'Широта', 'Долгота', 'ощущается', 'ветер', 'км/ч', 'влажность']
  } else {
    langArr = ['search', 'Search your city', 'Latitude', 'Longitude', 'fellings like', 'wind', 'kph', 'humidity']
  }
  console.dir(langArr);
}
function changeLanguageInUI() {
  searchBtn.innerText = langArr[0];
  searchField.placeholder = langArr[1];
  latitude.innerText = langArr[2];
  longitude.innerText = langArr[3];
}

// Add Search City
function searchCity() {
  let str = searchField.value;
  return str;
}

// Add Actual City
function addActualCity() {
  return searchCity() === '' ? 'Minsk' : searchCity();
}

// Add map
mapboxgl.accessToken = 'pk.eyJ1IjoidHJ5YnVraG91c2tpIiwiYSI6ImNraTdydGVoajBiNjAydHA5NGdvbWltZWQifQ.O29MAIslHbrJvOqL7eGZ4w';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [32, 54],
  zoom: 9
});

// Get location
async function getLocation() {
  const url = 'https://ipinfo.io/json?token=d6868703d51a54';
  const res = await fetch(url);
  const data = await res.json();
  let loc = data.loc.split(',');
  userLocation.innerText = `${data.region}, ${data.country}`;
  latitude.innerText = `${langArr[2]}: ${loc[0]}`;
  longitude.innerText = `${langArr[3]}: ${loc[1]}`;
  console.dir(data);
}



getLocation();
getDate();
getWeather();
