function formatDate(timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10) {
      hours = `0${hours}`;
   }

   let minutes = date.getMinutes();
   if (minutes < 10) {
      minutes = `0${minutes}`;
   }

   let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;

}

function displayTemperature(response) {
   let currentTemp = document.querySelector('#current-temp');
   let currentCity = document.querySelector('#city');
   let currentDescription = document.querySelector('#weather-description');
   let precipitationElement = document.querySelector('#precipitation');
   let windElement = document.querySelector('#wind');
   let cloudCoverElement = document.querySelector('#cloud-cover');

   let dateElement = document.querySelector('#date');

   let iconElement = document.querySelector('#main-img');


   celsiusTemperature = response.data.main.temp;

   currentTemp.innerHTML = Math.round(celsiusTemperature);
   currentCity.innerHTML = response.data.name;
   currentDescription.innerHTML = response.data.weather[0].description;
   precipitationElement.innerHTML = Math.round(response.data.main.humidity);
   windElement.innerHTML = Math.round(response.data.wind.speed);
   cloudCoverElement.innerHTML = Math.round(response.data.clouds.all);

   dateElement.innerHTML = formatDate(response.data.dt * 1000);

   iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
   iconElement.setAttribute(
      "alt",
      response.data.weather[0].description
   );  




}

function search(city) {
   let apiKey = ("2ef93a39c16392eacc33b8d28a8db82d");
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
   event.preventDefault();
   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);  
}

function displayFahrenheitTemperature(event) {
   event.preventDefault();

   celsiusLink.classList.remove("active");
   celsiusLink.classList.add("active-two");
   fahrenheitLink.classList.add("active");

   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

   let temperatureElement = document.querySelector("#current-temp");
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
   event.preventDefault();

   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");

   let temperatureElement = document.querySelector("#current-temp");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;


let form = document.querySelector(".search-form");
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
