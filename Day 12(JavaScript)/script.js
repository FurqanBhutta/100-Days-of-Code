const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

  const city = document.getElementById("city").value;

  if (city === "") {
    alert("Enter city name");
    return;
  }

  const apiKey = "7791bf68518ebfa74fdc4d93c46d08f2";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("cityName").innerText =
      data.name;

    document.getElementById("temperature").innerText =
      `🌡 Temperature : ${data.main.temp} °C`;

    document.getElementById("condition").innerText =
      `☁ Weather : ${data.weather[0].main}`;

    document.getElementById("humidity").innerText =
      `💧 Humidity : ${data.main.humidity}%`;

    document.getElementById("wind").innerText =
      `💨 Wind : ${data.wind.speed} m/s`;

  }

  catch (error) {

    alert(error.message);

  }

}