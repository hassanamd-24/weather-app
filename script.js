const input = document.getElementById("city-input");
const searchbtn = document.getElementById("search-btn");
const weatherCard = document.querySelector(".weather-app-card");

const citytext = document.getElementById("location-name");
const currtemp = document.getElementById("currtemp");
const conditiontext = document.getElementById("condition-text");
const humidityval = document.getElementById("humidity-val");
const windval = document.getElementById("wind-val");
const feelsval = document.getElementById("feels-like-val");
const icon = document.getElementById("weather-icon");

// const API_KEY = "6175b983db3e8d160a5060c2b90a73bc";

searchbtn.addEventListener("click", async () => {
    const city = input.value.trim();
    if (!city) return alert("Please enter a city name");

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=6175b983db3e8d160a5060c2b90a73bc`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        
        // Remove animation class to reset it before updating content
        weatherCard.classList.remove("fade-in");
        // Trigger a quick reflow to let the browser register the removal
        void weatherCard.offsetWidth; 

        // Update UI Text Data
        citytext.innerText = data.name;
        currtemp.innerText = `${data.main.temp.toFixed(1)}°C`;
        humidityval.innerText = `${data.main.humidity}%`;
        
        const windSpeedKmH = (data.wind.speed * 3.6).toFixed(1);
        windval.innerText = `${windSpeedKmH} Km/h`;
        feelsval.innerText = `${data.main.feels_like.toFixed(1)}°C`;
        conditiontext.innerText = data.weather[0].description;
        
        // Update Weather Icon safely
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.style.display = "block";

        // Add smooth fade-in animation class back
        weatherCard.classList.add("fade-in");

        // 🌟 DYNAMIC BACKGROUND LOGIC
        // Reset old background theme classes on body
        document.body.className = ""; 
        
        const mainCondition = data.weather[0].main.toLowerCase(); // e.g., "clouds", "rain"
        const iconCode = data.weather[0].icon; // 'd' means day, 'n' means night

        if (mainCondition === "clear") {
            // Check if it's day or night for clear skies
            if (iconCode.includes("n")) {
                document.body.classList.add("clear-night");
            } else {
                document.body.classList.add("clear-day");
            }
        } else if (document.body.classList.contains(mainCondition) === false) {
            // Apply corresponding class for clouds, rain, snow, mist, etc.
            document.body.classList.add(mainCondition);
        }

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});