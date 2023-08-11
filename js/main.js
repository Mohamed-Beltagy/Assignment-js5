let search = document.querySelector("#search");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


search.addEventListener("keyup", function (e) {
    getData(e.target.value)
})

async function getData(searchKey) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bfc91d3d709b4c2b960152133230908&q=${searchKey}&days=3`);
    let allData = await res.json();

    display(allData.location, allData.current)
    secDisplay(allData.forecast.forecastday)
}

getData("cairo");

function display(loc, curr) {
    let cartona = ""
    let x = new Date(curr.last_updated);

    cartona = `
    <div class="today-weather">
    <div class="head d-flex justify-content-between align-items-center">
        <p class="ps-3 mb-0 py-2">${days[x.getDay()]}</p>
        <p class="pe-3 mb-0 py-2">${x.getDate() + monthNames[x.getMonth()]}</p>
    </div>
    <div class="body">
    
        <div class="city ps-3">
            ${loc.name}
        </div>
        <div class="temp ps-3 d-flex align-items-center">
            <div class="deg">${curr.temp_c}<sup>o</sup>C</div>
            <img class="icon" src="https:${curr.condition.icon}" alt="logo">
        </div>
        <div class="day-info ps-3 text-color">
        ${curr.condition.text}
        </div>

        <span class="mx-3"><img src="imgs/icon-umberella.png" alt="logo"> ${curr.humidity}%</span>
        <span class="me-3"><img src="imgs/icon-wind.png" alt="logo"> ${curr.wind_kph}km/h</span>
        <span><img src="imgs/icon-compass.png" alt="logo"> ${curr.wind_dir}</span>

    </div>
    
</div>`
    document.getElementById("weather").innerHTML = cartona;
}


function secDisplay(cast) {
    let secCartona = ""
    for (let index = 1; index < cast.length; index++) {

        secCartona += `<div class="other-day">
        <div class="head text-center">
        <p class="py-2 mb-0">${days[new Date(cast[index].date).getDay()]}</p>
    </div>
        <div class="body">
            <div class="temp ps-3 text-center">
            <img class="other-icon" src="https:${cast[index].day.condition.icon}" alt="logo">
                <div class="other-deg-max">${cast[index].day.maxtemp_c}<sup>o</sup>C</div>
                <small class="other-deg-min">${cast[index].day.mintemp_c}<sup>o</sup>C</small>

            </div>
            <div class="day-info ps-3 text-center text-color">
            ${cast[index].day.condition.text}
            </div>
        </div>
        
        </div>
`
    }
    document.getElementById("weather").innerHTML += secCartona;
}

