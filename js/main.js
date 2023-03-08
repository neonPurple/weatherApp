const apiKey = '075255a871d49fc5e75efcd0b93f2ce5'
// document.querySelector('button').addEventListener('click', getFetch)

//This code will check that users have given permission to use HTML5 geolocation
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition)
    }
    else{
        console.log('Geolocation is not supported by this browser')
    }
}

//This code will return the coordinates of user location if permission has been granted
function getPosition(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(latitude, longitude)
    getFetch()

    function getFetch(){
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)   
              const sunRise = new Date(data.sys.sunrise * 1000)
              const sunSet = new Date(data.sys.sunset * 1000)
              const currDate = new Date()
              const icon = data.weather[0].icon

              document.querySelector('h2').innerHTML = data.name
              document.querySelector('h1').innerHTML = data.main.temp + `&deg;F`
              document.querySelector('.high').innerHTML = `High: ` + data.main.temp_max + `&deg;F`
              document.querySelector('.low').innerHTML = `Low: ` + data.main.temp_min + `&deg;F`
              document.querySelector('.rise').innerHTML = `Sun Rise: ` + sunRise.toLocaleTimeString('default')
              document.querySelector('.set').innerHTML = `Sunset: ` + sunSet.toLocaleTimeString('default')
              document.querySelector('.wind').innerHTML = `Wind: ` + data.wind.speed + ` MPH`
              document.querySelector('.date').innerHTML = currDate.toDateString()
              document.querySelector('img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
              document.querySelector('.txtDesc').innerHTML = data.weather[0].main
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
      }
}

getLocation()




