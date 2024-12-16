let weatherApiKey = 'c343b5d0c5e54bceb32130044241412'
let Elm = document.getElementById("Elm")
let searchInput = document.getElementById("search")
let inputValue

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let userCity,
current_day,
current_date,
current_month,
current_city,
current_temp_c,
current_conditionIcon,
current_conditionText,
current_cloud,
current_wind_kph,
current_wind_dir,

next_day,
next_conditionIcon,
next_conditionText,
next_maxtemp_c,
next_mintemp_c,

next2_day,
next2_conditionIcon,
next2_conditionText,
next2_maxtemp_c,
next2_mintemp_c


getLocation()
async function getLocation(){
    let response = await fetch("https://geolocation-db.com/json/eb94b630-6cef-11ef-a828-4b4353e7f1c2")
    let data = await response.json()
    userCity = data.city
    inputValue = userCity
    searchCity()
}

async function searchCity () {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${inputValue}&days=3`)
    let data = await response.json()
    // Current
    current_day = days[(new Date(data.location.localtime)).getDay()]
    current_date = new Date (data.location.localtime).getDate() 
    current_month = months[new Date (data.location.localtime).getMonth()]
    current_city = data.location.name
    current_temp_c = data.current.temp_c
    current_conditionIcon = data.current.condition.icon
    current_conditionText = data.current.condition.text
    current_cloud = data.current.cloud
    current_wind_kph = data.current.wind_kph
    current_wind_dir = data.current.wind_dir
    // Day 1
    next_day = days[new Date(data.forecast.forecastday[1].date).getDay()] ,
    next_conditionIcon = data.forecast.forecastday[1].day.condition.icon,
    next_conditionText = data.forecast.forecastday[1].day.condition.text,
    next_maxtemp_c = data.forecast.forecastday[1].day.maxtemp_c,
    next_mintemp_c = data.forecast.forecastday[1].day.mintemp_c,
    // Day 2
    next2_day = days[new Date(data.forecast.forecastday[2].date).getDay()],
    next2_conditionIcon = data.forecast.forecastday[2].day.condition.icon,
    next2_conditionText = data.forecast.forecastday[2].day.condition.text,
    next2_maxtemp_c = data.forecast.forecastday[2].day.maxtemp_c,
    next2_mintemp_c = data.forecast.forecastday[2].day.mintemp_c

    display()
}
searchInput.addEventListener("input",function(){
    inputValue= String(searchInput.value)
    searchCity()
})
function display(){
    Elm.innerHTML = 
    `
    <div class="col-12 col-lg-4">
                <div class="card text-white">
                    <div class="header d-flex justify-content-between">
                            <div class="card-header one">
                                ${current_day}
                            </div>
                            <div class="card-header two">
                                ${current_date} ${current_month}
                            </div>
                        </div>
                        <div class="card-body">
                          <h6 class="card-title">
                            ${current_city}
                        </h6>
                          <div class="d-flex flex-lg-column align-items-center align-items-lg-start gap-5 gap-lg-0">
                              <p class=" fw-bolder h1"style="font-size: 90px;" >${current_temp_c}<sup>o</sup>C</p>
                            <img src="${current_conditionIcon}" alt="compass" width="100">
                          </div>
                          <span style="color:var(--mainColor)">
                            ${current_conditionText}
                        </span>
                        <div class="my-3 icons d-flex gap-4">
                            <div>
                                <img src="images/icon-umberella@2x.png" alt="umberella" width="25">
                                ${current_cloud}%
                            </div>
                            <div>
                                <img src="images/icon-compass@2x.png" alt="compass" width="25">
                                ${current_wind_kph}
                            </div>
                            <div>
                                <img src="images/icon-wind@2x.png" alt="wind" width="25">
                                ${current_wind_dir}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="card text-white two">
        <div class="header d-flex justify-content-center">
            <div class="card-header one">
                ${next_day}
            </div>
        </div>
        <div class="card-body">
            <div class="d-flex flex-column align-items-center gap-lg-0">
            <img src="${next_conditionIcon}" alt="compass" class="my-4" width="50">
                <p class="fw-bold fs-4 m-0" >${next_maxtemp_c}<sup>o</sup>C</p>
                <p class="-sec  fs-6 mt-0" >${next_mintemp_c}<sup>o</sup></p>
            </div>
            <span style="color:var(--mainColor)" class="w-100 d-flex justify-content-center">
            ${next_conditionText}
        </span> 
        </div>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="card text-white">
        <div class="header d-flex justify-content-center">
            <div class="card-header one">
                ${next2_day}
            </div>
        </div>
        <div class="card-body">
            <div class="d-flex flex-column align-items-center gap-lg-0">
            <img src="${next2_conditionIcon}" alt="compass" class="my-4" width="50">
                <p class="fw-bold fs-4 m-0" >${next2_maxtemp_c}<sup>o</sup>C</p>
                <p class="-sec  fs-6 mt-0" >${next2_mintemp_c}<sup>o</sup></p>
            </div>
            <span style="color:var(--mainColor)" class="w-100 d-flex justify-content-center">
            ${next2_conditionText}
        </span> 
        </div>
        </div>
    </div>
    `
}


