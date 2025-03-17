// Your code here
var weatherSection = document.getElementById('weather')
var form = document.querySelector('form')
var inputEl = document.getElementById('weather-search')

form.onsubmit = function(e) {
    e.preventDefault()
    var userQuery = this.search.value.trim()
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather'
    var queryString = '?units=imperial&appid=e1a82f604d41c08378f9111b9b223d94&q=' + userQuery
    var fetchURL = weatherURL + queryString

    if(!userQuery) return
    form.search.value = ""
    
    fetch(fetchURL)
    .then(function(res) {
        if (res.status != 200) {
            throw new Error('Location not found')
        }
        return res.json()
    })
    .then (viewLocation)
    .catch(function(err) {
        weatherSection.innerHTML = ""
        var locationError = document.createElement('h2')
        locationError.textContent = err.message
        weatherSection.appendChild(locationError)
    })
}

function viewLocation(location){
    weatherSection.innerHTML = ""

    // City and Country Code
    var cityCountry = document.createElement('h2')
    cityCountry.textContent = location.name.toUpperCase() +', ' + location.sys.country
    weatherSection.appendChild(cityCountry)

    // Google Maps link to location
    var latitude = location.coord.lat
    var longitude = location.coord.lon
    var googleMapsURL = 'https://www.google.com/maps/search/'
    var coordinateString = '?api=1&query=' + latitude + ','+ longitude
    var googleMapsCoordURL = googleMapsURL + coordinateString
    var googleMapsLink = document.createElement('a')
    googleMapsLink.setAttribute('href',googleMapsCoordURL )
    googleMapsLink.textContent = 'Click to view map'
    weatherSection.appendChild(googleMapsLink)

    // Weather icon
    var openWeatherIconURL = 'https://openweathermap.org/img/wn/'
    var weatherIconCode = location.weather[0].icon
    var weatherIconURL = openWeatherIconURL + weatherIconCode + '@2x.png'
    var weatherIconImg = document.createElement('img')
    weatherIconImg.src = weatherIconURL
    weatherIconImg.alt = location.weather[0].description
    var weatherDescription = document.createElement('p')
    weatherDescription.textContent = location.weather[0].description
    weatherSection.appendChild(weatherIconImg)
    weatherSection.appendChild(weatherDescription)

    //Current Temperature
    var currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + location.main.temp + '\u00B0F'
    weatherSection.appendChild(currentTemp)
   
    //Feels Like Temp
    var feelsLikeTemp = document.createElement('p')
    feelsLikeTemp.textContent = 'Feels like: ' + location.main.feels_like + '\u00B0F'
    weatherSection.appendChild(feelsLikeTemp)

    //Last updated time
    var updatedTimeSeconds = (location.dt)*1000
    var date = new Date(updatedTimeSeconds)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    var updatedTime = document.createElement('p')
    updatedTime.textContent = 'Last updated: ' + timeString
    weatherSection.appendChild(updatedTime)
}