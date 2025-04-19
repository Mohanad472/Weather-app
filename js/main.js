let city = document.querySelector(".city");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let todayDegree = document.querySelector("#today .degree .num");
let todayCustom = document.querySelector("#today .custom");
let tomorrowDegree = document.querySelector("#tomorrow .degree");
let tomorrowDegreeNight = document.querySelector("#tomorrow .degreeNight");
let tomorrowCustom = document.querySelector("#tomorrow .custom");
let afterTomorrowDegree = document.querySelector("#aftertom .degree");
let afterTomorrowDegreeNight = document.querySelector("#aftertom .degreeNight");
let afterTomorrowCustom = document.querySelector("#aftertom .custom");
let day = document.querySelector(".day");
let myTomorrowDay = document.querySelector("#tomorrow .day");
let myAfterTomorrowDay = document.querySelector("#aftertom .day");
let todayDate = document.querySelector("#today .date");
let todayIcon = document.querySelector("#today .icon img");
let tomorrowIcon = document.querySelector("#tomorrow .icon img");
let afterTomorrowIcon = document.querySelector("#aftertom .icon img");

let myLatitude, myLongitude;

searchInput.addEventListener("input", function () {
  display(searchInput.value, "search");
});
getLocation();
display("london", "search");

// function display() {
//   getData(searchInput.value);
// }

// async function getDataall(inputCity) {
//   let x = await fetch(
//     `https://api.weatherapi.com/v1/search.json?key=25711540ec664bbb99f184630251904&q=${inputCity}`
//   );
//   let data;
//   if (x.ok) {
//     data = await x.json();
//   }

//   return data;
// }

// let xxx = getDataall("london");
// xxx.then((data) => {
//   console.log(data);
// });

async function getDataBySearch(inputCity) {
  let x = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=25711540ec664bbb99f184630251904&q=${inputCity}`
  );
  let data;
  if (x.ok) {
    data = await x.json();
  }

  // city.innerHTML = data[0].name;

  let future;
  let y = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=25711540ec664bbb99f184630251904&q=${data[0].name}&days=3`
  );
  if (y.ok) {
    future = await y.json();
  }

  return future;
}

async function getDataByLocation(myLatitude, myLongitude) {
  let future;
  let y = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=25711540ec664bbb99f184630251904&q=${myLatitude},${myLongitude}&days=3`
  );
  if (y.ok) {
    future = await y.json();
  }

  return future;
}

async function display(inputCity, method) {
  // let x = await fetch(
  //   `https://api.weatherapi.com/v1/search.json?key=25711540ec664bbb99f184630251904&q=${inputCity}`
  // );
  // let data;
  // if (x.ok) {
  //   data = await x.json();
  // }

  // city.innerHTML = data[0].name;

  // let future;
  // let y = await fetch(
  //   `https://api.weatherapi.com/v1/forecast.json?key=25711540ec664bbb99f184630251904&q=${data[0].name}&days=3`
  // );
  // if (y.ok) {
  //   future = await y.json();
  // }
  let future;
  if (method == "search") {
    future = await getDataBySearch(inputCity);
  } else if (method == "location") {
    future = await getDataByLocation(myLatitude, myLongitude);
  }
  city.innerHTML = future.location.name;
  todayDegree.innerHTML = future.current.temp_c + "<sup>o</sup>C";
  todayCustom.innerHTML = future.current.condition.text;
  tomorrowDegree.innerHTML =
    future.forecast.forecastday[1].day.maxtemp_c + "<sup>o</sup>C";
  tomorrowDegreeNight.innerHTML =
    future.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C";
  tomorrowCustom.innerHTML = future.forecast.forecastday[1].day.condition.text;
  afterTomorrowDegree.innerHTML = future.forecast.forecastday[2].day.maxtemp_c;
  afterTomorrowDegreeNight.innerHTML =
    future.forecast.forecastday[2].day.mintemp_c;
  afterTomorrowCustom.innerHTML =
    future.forecast.forecastday[2].day.condition.text;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  let todayDay = new Date(future.forecast.forecastday[0].date);
  let tomorrowDay = new Date(future.forecast.forecastday[1].date);
  let afterTomorrowDay = new Date(future.forecast.forecastday[2].date);
  day.innerHTML = days[todayDay.getDay()];
  myTomorrowDay.innerHTML = days[tomorrowDay.getDay()];
  myAfterTomorrowDay.innerHTML = days[afterTomorrowDay.getDay()];
  console.log(days[afterTomorrowDay.getDay()]);
  console.log(afterTomorrowDay);

  todayDate.innerHTML = todayDay.getDate() + months[todayDay.getMonth()];

  todayIcon.src =
    "https://" + future.forecast.forecastday[0].day.condition.icon;
  tomorrowIcon.src =
    "https://" + future.forecast.forecastday[1].day.condition.icon;
  afterTomorrowIcon.src =
    "https://" + future.forecast.forecastday[2].day.condition.icon;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function success(position) {
  myLatitude = position.coords.latitude;
  myLongitude = position.coords.longitude;
  display("cairo", "location");
  console.log(myLatitude);
  console.log(myLongitude);
}

function error() {
  alert("Sorry, no position available.");
}
