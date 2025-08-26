const apiKey = 'fb232fc98bd701b2b4d33abadff715ca'; // Replace with your OpenWeatherMap API key

// DOM Elements
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const descriptionIcon = document.querySelector(".weather-icon");
const dateElement = document.querySelector(".date");
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");
const locationBtn = document.querySelector(".location-btn");

// Fetch weather by city
async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Unable to fetch weather");
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

// Update UI
function updateWeatherUI(data) {
  cityElement.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°`;
  windSpeed.textContent = `${Math.round(data.wind.speed)} km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  descriptionText.textContent = data.weather[0].description;

  const currentDate = new Date();
  dateElement.textContent = currentDate.toDateString();

  descriptionIcon.textContent = getWeatherIconName(data.weather[0].main);
}

// Icon Mapping
function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };
  return iconMap[weatherCondition] || "help";
}

// Event Listeners
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = inputElement.value.trim();
  if (city) fetchWeatherData(city);
  inputElement.value = "";
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => alert("Unable to access location")
    );
  } else {
    alert("Geolocation not supported");
  }
});

// Default Load
fetchWeatherData("Delhi");



