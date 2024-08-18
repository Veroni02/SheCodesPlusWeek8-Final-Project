// for date
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysInWeek = week[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${daysInWeek} ${hours}:${minutes}`;
}

function UpdateWeatherInfos(response) {
  //city
  let cityElement = document.querySelector("#weather-app-city");
  let city = response.data.city;
  cityElement.innerHTML = city;

  //temperature
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  //humidity
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  //wind speed
  let windElement = document.querySelector("#windSpeed");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind}km/h`;

  // condition description
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  conditionElement.innerHTML = condition;

  //time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt="weather-app-icon"
                class="weather-app-icon"
                id="weather-app-icon"
              />`;
  getForecastData(response.data.city);
}

function handlWeatherDetails(city) {
  let apiKey = "a23a5ab0t0ce0fbdaab943206coccdb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(UpdateWeatherInfos);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputEle = document.querySelector("#search-form-input");
  handlWeatherDetails(searchInputEle.value);
}

let searchInputElement = document.querySelector("#search-form");
searchInputElement.addEventListener("submit", handleSearchSubmit);

function formattedForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let week = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return week[date.getDay()];
}

function getForecastData(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecastData);
}

function displayForecastData(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-details">        
            <div class="weather-forecast-daysOfWeek">${formattedForecastDate(
              day.time
            )}</div>
            <div>
              <img
                src="${day.condition.icon_url}"
                class="weather-forecast-icon"
              />
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
        </div>`;
    }
  });
  let forecastHtmlElement = document.querySelector("#weather-forecast");
  forecastHtmlElement.innerHTML = forecastHtml;
}

handlWeatherDetails("Paris");
