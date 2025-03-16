// Your code here


var weatherAppDiv = document.getElementById('weather-app')
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
        return res.json()
    })
    .then (viewLocation)
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
   



    console.log(location)

}