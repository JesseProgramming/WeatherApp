import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import GetLocation from './components/get-location';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY} from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import Target from './target.svg';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));
  }
  const getMyLocation = (searchData) => {

    const cords = {};
    GetLocation();

    function GetLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
          console.log(cords);
          return{cords}
        } 
        else { 
          console.log("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
      cords.lat = position.coords.latitude;
      cords.long = position.coords.longitude;

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${cords.lat}&lon=${cords.long}&appid=${WEATHER_API_KEY}&units=imperial`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${cords.lat}&lon=${cords.long}&appid=${WEATHER_API_KEY}&units=imperial`);
  
      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();
  
          setCurrentWeather({city: "Weather near you:", ...weatherResponse});
          setForecast({city: "Weather near you:", ...forecastResponse});
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <button onClick={getMyLocation} className="location-button"><img src={Target} ></img> Use my location</button>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
