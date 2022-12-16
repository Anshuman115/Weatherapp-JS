// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 9f3b9f48a91e9db2aedc9a842688de48

const weatherAPI = {
  key: "9f3b9f48a91e9db2aedc9a842688de48",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

const searchInputBox = document.querySelector("#inputBox");

//event listener fun on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13 /*13 for enter key*/) {
    console.log(searchInputBox.value);
    getReport(searchInputBox.value);
    document.querySelector(".detailsBody").style.display = "block";
  }
});

//get weather report
function getReport(city) {
  console.log("Fetching");
  fetch(`${weatherAPI.baseUrl}q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then((weather) => {
      //   console.log("showing");
      return weather.json();
    })
    .then(showReport);
}

//show weather report
function showReport(weather) {
  //   console.log("showing");
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minmax = document.querySelector(".minMax");
  minmax.innerHTML = `${Math.floor(weather.main.temp)}&deg;C min & ${Math.ceil(
    weather.main.temp
  )}&deg;C max`;

  let weatherType = document.querySelector(".weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.querySelector(".date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url(images/clear.jpg)";
  }

  if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url(images/haze.jpg)";
  }

  if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  }

  if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  }
}

//date manage
function dateManage(todayDate) {
  console.log("getting");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "December",
  ];

  let year = todayDate.getFullYear();
  let month = months[todayDate.getMonth()];
  let date = todayDate.getDate();
  let day = days[todayDate.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
