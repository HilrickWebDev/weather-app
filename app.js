// Get the form element
const form = document.querySelector("#weather-form");
// Get the weather container element
const weatherContainer = document.querySelector("#weather-container");

const weatherIcons = {
  "clear sky": "clear.png",
  "few clouds": "cloudy-sun.png",
  "scattered clouds": "cloudy.png",
  "broken clouds": "cloudy.png",
  "overcast clouds": "cloudy.png",
  "light rain": "rainy-1.png",
  "moderate rain": "rainy-3.png",
  "heavy intensity rain": "rainy-5.png",
  "shower rain": "rainy-6.png",
  thunderstorm: "thunder.png",
  snow: "snowy-4.png",
  "light snow": "snowy-4.png",
  mist: "cloudy.png",
};

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the location input
  const location = document.querySelector("#location-input").value;

  // Make a request to the OpenWeatherMap API to get the weather data for the location
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e693db7c1be51e9be4202541a0907cde&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Get the latitude and longitude of the city
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;

      // Make a request to the TimezoneDB API to get the current time at the location
      fetch(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=AW6YELO8YFC2&format=json&by=position&lat=${latitude}&lng=${longitude}`
      )
        .then((response) => response.json())
        .then((timeData) => {
          // Get the current hour at the location
          const hour = new Date(timeData.formatted).getHours();

          // Set the background color based on the current hour
          if (hour >= 6 && hour < 18) {
            // It's daytime
            document.body.style.backgroundColor = "lightblue";
          } else {
            // It's nighttime
            document.body.style.backgroundColor = "black";
          }
        });

      const weatherDescription = data.weather[0].description;
      const iconFilename = weatherIcons[weatherDescription];
      const weatherSvg = `<img src="icons/${iconFilename}" alt="${weatherDescription}" />`;

      // Display the weather data in the weather container
      weatherContainer.innerHTML = `
        <h2>Weather for ${data.name}</h2>
        ${weatherSvg}
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${weatherDescription}</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
      `;
      // Show the weather container
      weatherContainer.style.display = "block";
    });
});

if (location.protocol === "http:") {
  url =
    "http://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f";
} else {
  url =
    "https://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f";
}
