const secretkey = config.SECRET_KEY;

let city = document.getElementById("city");
const submitBtn = document.getElementById("submitBtn");

const weatherIntro = document.getElementById("weatherIntro");
const temperature = document.getElementById("temperature");
const weatherDescr = document.getElementById("weatherDescr");
const weatherDescr2 = document.getElementById("weatherDescr2");
const pressure = document.getElementById("pressure");
const windDescr = document.getElementById("windDescr");
const localTime = document.getElementById("localTime");
const humidity = document.getElementById("humidity");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

document.getElementById("searchButton").style.display = "none";
document.querySelector("section").style.display = "none";

const todayDate = document.getElementById("todayDate");

// Wind speed
let windSpeed = [
  "Calm",
  "Light Air",
  "Light Breeze",
  "Gentle Breeze",
  "Moderate Breeze",
  "Fresh Breeze",
  "Strong Breeze",
  "Near Gale",
  "Gale",
  "Strong Gale",
  "Whole Gale",
  "Storm Force",
  "Hurricane Force",
];

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  city = city.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${secretkey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== "404") {
        weatherIntro.innerText = `The weather in ${data.name}, ${data.sys.country} `;

        // Date/ time of visiter
        let myDate = new Date();
        let months = [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dez",
        ];

        todayDate.innerText = `${myDate.getHours()}:${myDate.getMinutes()}, ${myDate.getDate()} ${
          months[myDate.getMonth()]
        } ${myDate.getFullYear()} `;

        if (myDate.getMinutes() < 10) {
          todayDate.innerText = `${myDate.getHours()}:0${myDate.getMinutes()}, ${myDate.getDate()} ${
            months[myDate.getMonth()]
          } ${myDate.getFullYear()} `;
        } else if (myDate.getHours() < 10) {
          todayDate.innerText = `0${myDate.getHours()}:${myDate.getMinutes()}, ${myDate.getDate()} ${
            months[myDate.getMonth()]
          } ${myDate.getFullYear()} `;
        }

        // Timezone
        const startTime = () => {
          let dateToday = new Date();
          let utc = dateToday.getTime() + dateToday.getTimezoneOffset() * 60000;
          let showlocaltime = new Date(utc + data.timezone * 1000);

          localTime.innerHTML = `${showlocaltime.getHours()}:${showlocaltime.getMinutes()}`;
          if (showlocaltime.getMinutes() < 10) {
            localTime.innerHTML = `${showlocaltime.getHours()}:0${showlocaltime.getMinutes()}`;
          } else if (showlocaltime.getHours() < 10) {
            localTime.innerHTML = `0${showlocaltime.getHours()}:${showlocaltime.getMinutes()}`;
          }
        };
        startTime();

        // weather icon
        let image = document.createElement("img");
        image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weatherIcon").appendChild(image);

        // weather informations
        temperature.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
        weatherDescr.innerText = `${data.weather[0].description}`;
        weatherDescr2.innerText = `${data.weather[0].description}`;
        humidity.innerText = ` ${data.main.humidity}%`;
        pressure.innerText = `${data.main.pressure} hPa`;
        windDescr.innerText = `${windSpeed[Math.round(data.wind.speed)]}`;

        // sunset and sunrise (timezone)

        let sunriseTime = data.sys.sunrise;
        let dateSunrise = new Date(1000 * sunriseTime).toLocaleTimeString();
        sunrise.innerHTML = dateSunrise;

        let sunsetTime = data.sys.sunset;
        let dateSunset = new Date(1000 * sunsetTime).toLocaleTimeString();
        sunset.innerHTML = dateSunset;
      } else {
        document.body.innerHTML = "ERROR";
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      }

      document.getElementById("form").style.display = "none";
      document.getElementById("searchButton").style.display = "inline-block";
      document.getElementById("weatherContainer").style.display = "grid";
      document.querySelector("section").style.display = "flex";
    });
});

// SEARCH AGAIN BUTTON
document.getElementById("searchButton").addEventListener("click", () => {
  location.reload();
});
