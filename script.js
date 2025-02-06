const apiKey = "4de9b8db35bb4e248e545916250602";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging

            if (data.error) {
                document.getElementById("weatherResult").innerHTML = `<p>${data.error.message}</p>`;
                return;
            }

            const { temp_c, condition, humidity, wind_kph, air_quality } = data.current;
            const aqi = air_quality["pm2_5"];

            document.getElementById("weatherResult").innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p><strong>Temperature:</strong> ${temp_c}°C</p>
                <p><strong>Condition:</strong> ${condition.text}</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind_kph} km/h</p>
                <p><strong>Air Quality (PM2.5):</strong> ${aqi}</p>
                <img src="https:${condition.icon}" alt="Weather Icon">
            `;

            // Scroll to the weather result smoothly
            document.getElementById("weatherSection").scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data</p>`;
        });
}
