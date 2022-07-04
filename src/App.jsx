import { useState, useEffect } from 'react'
import axios from 'axios'


import './App.css'

function App() {
  const [weather, setWeather] = useState(0)
  const [toCelcius, setToCelcius] = useState(0)
  const [isCelcius, setIsCelcius] = useState(true)


  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e629c93a50d7bab3a3bdfb089bedcb8`)
        .then((res) => {
          setWeather(res.data)
          setToCelcius(Math.floor(res.data.main.temp - 273.15))
        })
    }


    navigator.geolocation.getCurrentPosition(success)
  }, [])


  console.log(toCelcius)

  const convertCelcius = () => {
    if (isCelcius) {
      setToCelcius((toCelcius * 9 / 5) + 32)
      setIsCelcius(false)
    } else {
      setToCelcius((toCelcius - 32) * 5 / 9)
      setIsCelcius(true)
    }
  }




  return (
    <div className="container">
      <h1>Weather app</h1>
      <h2>{weather.name}</h2>
      <h2>{weather.sys?.country}</h2>
      <div className='icon-container'>
        <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <p>"{weather.weather?.[0].description}"</p>
      </div>
      <h2>{toCelcius}</h2>
      <div className='weather-info'>
        <ul>
          <li><i class="fa-solid fa-cloud"></i> clouds {weather.clouds?.all} %</li>
          <li><i class="fa-solid fa-wind"></i> wind speed {weather.wind?.speed} m/s</li>
          <li><i class="fa-solid fa-person-circle-exclamation"></i> thermal sensation {weather.main?.feels_like}</li>
          <li></li>
        </ul>
      </div>
      <button className='boton' onClick={convertCelcius}>Degrees f/c</button>
    </div>
  )
}

export default App
