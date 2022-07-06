//last updated date
function showDate(datestamp) {
  let date = new Date(datestamp);

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December ",
  ];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + date.getMinutes();
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + date.getHours();
  }
  let time = `${hours}:${minutes}`;

  return `${month} ${dayNumber}, ${day}, ${time}`;
}

function citySearch(city) {
  let apiKey = "f28953e2adf95c39204b733667598ea9";
  let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(link).then(showTemperature);
  axios.get(link).then(showIcons);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);
}

// Output weather values from api
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-describe").innerHTML =
    response.data.weather[0].main;
  let temp = document.querySelector("#current-temperature");
  currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = currentTemp;
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#last-update-date").innerHTML = showDate(
    response.data.dt * 1000
  );
  futureForecast();
}

function futureForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["TUE", "WEN", "THU", "FRI", "SUT"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
            <ul class="future-forecast">
              <li class="day-of-the-week">${day}</li>
              <li>
                <img src="images/rain.svg" alt="" height="50" />
              </li>
              <li class="day-temperature">18°C</li>
              <li class="night-temperature">15°C</li>
            </ul>
          </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Main icon replacement
function showIcons(response) {
  let info = response.data.weather[0].main; //weather description from api
  let icon = document.querySelector("#icon-main");
  let iconWay = "";

  //Replacing the icon in html depending on the weather description
  switch (info) {
    case "Thunderstorm":
      iconWay = "images/thunderstorm.svg";
      break;
    case "Drizzle":
      iconWay = "images/rain.svg";
      break;
    case "Rain":
      iconWay = "images/rain.svg";
      break;
    case "Snow":
      iconWay = "images/snow.svg";
      break;
    case "Atmosphere":
      iconWay = "images/mist.svg";
      break;
    case "Clear":
      iconWay = "images/sun.svg";
      break;
    case "Clouds":
      iconWay = "images/clouds.svg";
      break;
    default:
      iconWay = "images/mist.svg";
  }

  //Replacing the icon and alt in in HTML
  icon.setAttribute("src", iconWay);
  icon.setAttribute("alt", info);
}

/* 
Finding your current location
API connection
Calling the city search function
Calling the Weather Value Function
Calling a function to replace the main icon
*/
function getLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
  function currentPosition(response) {
    let lat = response.coords.latitude;
    let lon = response.coords.longitude;
    let apiKey = "f28953e2adf95c39204b733667598ea9";
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(link).then(getCity);
    axios.get(link).then(showTemperature);
    axios.get(link).then(showIcons);
  }
}

//Takes the name of the city from the api and displays in html
function getCity(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function celciusShow(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  temp.innerHTML = currentTemp;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let formulaFahrenheit = Math.round(currentTemp * 1.8 + 32);
  temp.innerHTML = formulaFahrenheit;
}

let citySearchButton = document.querySelector("#button-search");
citySearchButton.addEventListener("click", cityInput);
let writeCity = document.querySelector("#city-search");
writeCity.addEventListener("search", cityInput);

let buttonCurrent = document.querySelector("#button-current");
buttonCurrent.addEventListener("click", getLocation);

let currentTemp = null;
let temp = document.querySelector("#current-temperature");
let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", celciusShow);

citySearch("Dnipro");
