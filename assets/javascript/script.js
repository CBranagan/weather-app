var searchButton = document.getElementById("search-button");
var searchName = document.getElementById("city");
var weatherBox = document.getElementById("weather-box");
var searches = document.getElementById("searches");
var searchNumber = 0;
var forecastBox = document.getElementById("forecast-box");
var searchList = [];

var searchAudit = function() {

    var newSearchList = localStorage.getItem("cityList");

    var searchList2 = JSON.parse(newSearchList)

    if (searchList2 === null) {
      
        return;

    } else {

    for (var i=0; i < searchList2.length; i++) {

        var previousSearch = document.createElement("div")
        previousSearch.classList = "card"
        
        var previousSearch2 = document.createElement("div")
        previousSearch2.classList = "card-body bg-secondary fw-bold"
        previousSearch2.textContent = searchList2[i]

        
        previousSearch.appendChild(previousSearch2)
        searches.appendChild(previousSearch)
    }

    console.log(searchList2)
}}


var formSubmit = function() {
    event.preventDefault();

    var cityName = searchName.value.trim();

    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=6KQdhx6MI0WFXgA4tp6Jwmgd0HCqaj1s&location=" + cityName).then(function(response) {
        response.json().then(function(data) {
            
            var Lat = data.results[0].locations[0].displayLatLng.lat
            var Lng = data.results[0].locations[0].displayLatLng.lng

            cityName = data.results[0].locations[0].adminArea5 + ", " + data.results[0].locations[0].adminArea3

            console.log(data)
            
            getWeather(Lat, Lng, cityName);

            searchList.push(cityName);
            
            localStorage.setItem("cityList", JSON.stringify(searchList))


            searchName.value = ""
        })
    })
 
}



var getWeather = function(Lat, Lng, cityName) {

    weatherBox.textContent = "";
    forecastBox.textContent = "";
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + Lat + "&lon=" + Lng + "&units=imperial&appid=91e1c438834c5e3d640330c8336046a5").then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {

                //display Current Weather

                var cityInfo = document.createElement("div");
                cityInfo.classList = "h2"
                cityInfo.textContent = cityName + " " + moment().format("MM DD YYYY")
                var weatherIcon = document.createElement("img");
                weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

                var temp = document.createElement("p")
                temp.textContent = "Temp: " + data.current.temp + " F"

                var wind = document.createElement("p")
                wind.textContent = "Wind: " + data.current.wind_speed + " MPH"

                var humidity = document.createElement("p")
                humidity.textContent = "Humidity: " + data.current.humidity + " %"

                var uvIndex = document.createElement("p")
                uvIndex.textContent = "UV Index: " + data.current.uvi

                if (data.current.uvi < 1) {
                    uvIndex.classList = "bg-success"
                } else if (data.current.uvi > 1 && data.current.uvi < 5) {
                    uvIndex.classList = "bg-warning"
                } else {
                    uvIndex.classList = "bg-danger"
                }


                cityInfo.appendChild(weatherIcon)
                weatherBox.appendChild(cityInfo)
                weatherBox.appendChild(temp)
                weatherBox.appendChild(wind)
                weatherBox.appendChild(humidity)
                weatherBox.appendChild(uvIndex)



                //make 5 day forecast

                for (var i=0; i < 5; i++) {

                    var dayCard = document.createElement("div");
                    dayCard.classList = "card bg-primary"
                    dayCard.setAttribute("style", "width: 12rem");

                    var dayDate = document.createElement("h3")
                    dayDate.textContent = moment(1).format("MM DD YYYY")
                    dayDate.classList = "text-light"


                    var dayIcon = document.createElement("img");
                    dayIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
                    dayIcon.classList = "card-img-top"

                    var dayTemp = document.createElement("p");
                    dayTemp.textContent = "Temp: " + data.daily[i].temp.day + " F"
                    dayTemp.classList = "text-light"

                    var dayWind = document.createElement("p");
                    dayWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
                    dayWind.classList = "text-light"

                    var dayHumidity = document.createElement("p")
                    dayHumidity.textContent = "Humidity: " + data.daily[i].humidity + " %"
                    dayHumidity.classList = "text-light"

                    dayCard.appendChild(dayDate)
                    dayCard.appendChild(dayIcon)
                    dayCard.appendChild(dayTemp)
                    dayCard.appendChild(dayWind)
                    dayCard.appendChild(dayHumidity)
                    forecastBox.appendChild(dayCard)

                }




                //create a previous search element

                var previousSearch = document.createElement("div")
                previousSearch.classList = "card"
                
                var previousSearch2 = document.createElement("div")
                previousSearch2.classList = "card-body bg-secondary fw-bold"
                previousSearch2.textContent = cityName

                
                previousSearch.appendChild(previousSearch2)
                searches.appendChild(previousSearch)

                

                

            })
        } else {
            alert("No City Found")
        }
    })
};


searchAudit();
searchButton.addEventListener("click", formSubmit);