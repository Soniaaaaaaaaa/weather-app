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
}
let celsius = document.querySelector("#unitC");
let celsiustemp = null;
let fahrenheittemp = null;
//temopary
displayForecact();
// end
celsius.addEventListener("click", function (event) {
  event.preventDefault();
  if (degree.innerHTML !== "" && fahrenheittemp !== null) {
    degree.innerHTML = celsiustemp;
    celsius.style.color = "black";
    fahrenheit.style.color = "purple";
  }
});
let fahrenheit = document.querySelector("#unitF");
fahrenheit.addEventListener("click", function (event) {
  event.preventDefault();
  if (degree.innerHTML !== "" && celsiustemp !== null) {
    fahrenheittemp = Math.round((celsiustemp - 32) / 1.8);
    degree.innerHTML = fahrenheittemp;
    celsius.style.color = "purple";
    fahrenheit.style.color = "black";
  }
});

function displayForecact() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `       <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="sunny" width="42"/><br/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max">18°</span>
                <span class="weather-forecast-temperatures-min">12°</span>
              </div>
            </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
