var searchButton = document.getElementById("search-button");
var searchName = document.getElementById("city");
var weatherBox = document.getElementById("weather-box");





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

            searchName.value = ""
        })
    })
 
}



var getWeather = function(Lat, Lng, cityName) {

    weatherBox.textContent = "";
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + Lat + "&lon=" + Lng + "&units=imperial&appid=91e1c438834c5e3d640330c8336046a5").then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {

                console.log(data)

                var cityInfo = document.createElement("div");
                cityInfo.classList = "h2"
                cityInfo.textContent = cityName + " " + moment().format("MM DD YYYY")
                var weatherIcon = document.createElement("img");
                weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

                var temp = document.createElement("p")
                temp.textContent = "Temp: " + data.current.temp + "F"

                var wind = document.createElement("p")
                wind.textContent = "Wind: " + data.current.wind_speed

                var humidity = document.createElement("p")
                humidity.textContent = "Humidity: " + data.current.humidity

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

            })
        } else {
            alert("No City Found")
        }
    })
};

searchButton.addEventListener("click", formSubmit);