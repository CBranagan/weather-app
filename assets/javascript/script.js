var searchButton = document.getElementById("search-button");
var searchName = document.getElementById("city");
var weatherBox = document.getElementById("weather-box");


var formSubmit = function() {
    event.preventDefault();

    var cityName = searchName.value.trim();

    getWeather(cityName);
    
}



var getWeather = function(cityName) {

    weatherBox.textContent = "";
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.56&lon=111.92&units=imperial&appid=91e1c438834c5e3d640330c8336046a5").then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {

                var cityInfo = document.createElement("div");
                cityInfo.classList = "h2"
                cityInfo.textContent = cityName + Date() + "icon";

                var temp = document.createElement("p")
                temp.textContent = data.current.temp

                var wind = document.createElement("p")
                wind.textContent = data.current.wind_speed

                var humidity = document.createElement("p")
                humidity.textContent = data.current.humidity

                var uvIndex = document.createElement("p")
                uvIndex.textContent = data.current.uvi

                if (data.current.uvi < 1) {
                    uvIndex.classList = "bg-success"
                } else if (data.current.uvi > 1 && data.current.uvi < 5) {
                    uvIndex.classList = "bg-warning"
                } else {
                    uvIndex.classList = "bg-danger"
                }



                
                weatherBox.appendChild(cityInfo)
                weatherBox.appendChild(temp)
                weatherBox.appendChild(wind)
                weatherBox.appendChild(humidity)
                weatherBox.appendChild(uvIndex)

                
                console.log(data)
            })
        } else {
            alert("No City Found")
        }
    })
};

searchButton.addEventListener("click", formSubmit);