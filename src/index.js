function dateFormat(timestampm) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let now = new Date();
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + now.getMinutes();
  }
  return `${days[now.getDay()]}, ${now.getHours()}:${min}`;
}
function formatDay(date) {
  let newdate = new Date(date * 1000);
  let day = newdate.getDay();
  let days = ["Sun", "Mon", "Tue", " Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
let form = document.querySelector("#form");
let apiKey = "c7c6539392c3a4c5e33e163fd7a6488d";
let url = "https://api.openweathermap.org/data/2.5/weather?";
axios
  .get(`${url}q=Kyiv&units=metric&appid=${apiKey}`)
  .then(showTempAndCityAndHum);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = document.querySelector(".form-city");
  axios
    .get(`${url}q=${cityName.value}&units=metric&appid=${apiKey}`)
    .then(showTempAndCityAndHum);
});
let degree = document.querySelector(".degree");
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecact);
}
function showPosition(position) {
  let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(link).then(showTempAndCityAndHum);
}
let currentBtn = document.querySelector(".current");
currentBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});
function showTempAndCityAndHum(response) {
  let data = document.querySelector("#time");
  let city = document.querySelector(".city");
  let hum = document.querySelector("#hum");
  let windSpeed = document.querySelector("#wind");
  let img = document.querySelector(".icon");
  data.innerHTML = dateFormat(response.data.dt * 1000);
  celsiustemp = Math.round(response.data.main.temp);
  degree.innerHTML = celsiustemp;
  city.innerHTML = `city: ${response.data.name}`;
  hum.innerHTML = `${response.data.main.humidity}`;
  windSpeed.innerHTML = response.data.wind.speed;
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  img.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function displayForecact(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let max = forecastDay.temp.max;
    let min = forecastDay.temp.min;
    if (index < 5) {
      forecastHTML += `       <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="${
        forecastDay.weather[0].description
      }" width="50"/><br/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperatures-max">${Math.round(
                    max
                  )}?? </span>
                  <span class="weather-forecast-temperatures-min">${Math.round(
                    min
                  )}??</span>
                </div>
              </div>
      `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
