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
   console.log(response.data);

   let currentTemp = document.querySelector('#current-temp');
   let currentCity = document.querySelector('#city');
   let currentDescription = document.querySelector('#weather-description');
   let precipitationElement = document.querySelector('#precipitation');
   let windElement = document.querySelector('#wind');
   let cloudCoverElement = document.querySelector('#cloud-cover');

   let dateElement = document.querySelector('#date');

   currentTemp.innerHTML = Math.round(response.data.main.temp);
   currentCity.innerHTML = response.data.name;
   currentDescription.innerHTML = response.data.weather[0].description;
   precipitationElement.innerHTML = Math.round(response.data.main.humidity);
   windElement.innerHTML = Math.round(response.data.wind.speed);
   cloudCoverElement.innerHTML = Math.round(response.data.clouds.all);

   dateElement.innerHTML = formatDate(response.data.dt * 1000);



   
}

let apiKey = ("2ef93a39c16392eacc33b8d28a8db82d");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);