const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const cityRef = document.getElementById("city");
const key = "1602578432039aed20e19af607f6c2ce";
const getWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.cod === "404") {
                result.innerHTML = `<h3 class="msg">City not found</h3>`;
                return;
            }

            result.innerHTML = `
                        <h2>${data.name}</h2>
                        <h4 class="weather">${data.weather[0].main}</h4>
                        <h4 class="desc">${data.weather[0].description}</h4>
                        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                        <h1>${data.main.temp} &#176;</h1>
                        <div class="temp-container">
                            <div>
                                <h4 class="title">min</h4>
                                <h4 class="temp">${data.main.temp_min}&#176;</h4>
                            </div>
                            <div>
                                <h4 class="title">max</h4>
                                <h4 class="temp">${data.main.temp_max}&#176;</h4>
                            </div>
                        </div>
                    `;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Unable to fetch weather data</h3>`;
        });
};

const getWeatherByCity = () => {
    const cityValue = cityRef.value.trim();
    if (cityValue.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    } else {
        getWeather(cityValue);
        cityRef.value = "";
    }
};

const getWeatherByLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    result.innerHTML = `
                                <h2>${data.name}</h2>
                                <h4 class="weather">${data.weather[0].main}</h4>
                                <h4 class="desc">${data.weather[0].description}</h4>
                                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                                <h1>${data.main.temp} &#176;</h1>
                                <div class="temp-container">
                                    <div>
                                        <h4 class="title">min</h4>
                                        <h4 class="temp">${data.main.temp_min}&#176;</h4>
                                    </div>
                                    <div>
                                        <h4 class="title">max</h4>
                                        <h4 class="temp">${data.main.temp_max}&#176;</h4>
                                    </div>
                                </div>
                            `;
                })
                .catch(() => {
                    result.innerHTML = `<h3 class="msg">Unable to fetch weather data</h3>`;
                });
        }, () => {
            result.innerHTML = `<h3 class="msg">Geolocation not supported or permission denied</h3>`;
        });
    } else {
        result.innerHTML = `<h3 class="msg">Geolocation not supported by your browser</h3>`;
    }
};

searchBtn.addEventListener("click", getWeatherByCity);
locationBtn.addEventListener("click", getWeatherByLocation);
window.addEventListener("load", getWeatherByCity);
