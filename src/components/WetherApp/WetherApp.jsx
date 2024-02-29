import React, { useState } from 'react';
import "./WetherApp.css";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import four from "./Assets/humidity.png";
import rain_icon from "./Assets/rain.png";
import searchicons from "./Assets/search.png";
import snow_icon from "./Assets/snow.png";
import wind from "./Assets/wind.png";

const WetherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    // Define the API key before using it in the URL
    let api_key = "876bfefd05394c4912dafc69da601b73";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    // Extracted elements for better readability
    let humidityElement = document.getElementsByClassName('humidity-percentace');
    let windElement = document.getElementsByClassName('wind-rate');
    let tempElement = document.getElementsByClassName('weather-temp');
    let locationElement = document.getElementsByClassName('weather-location');

    // Update UI with weather data
    humidityElement[0].innerHTML = data.main.humidity;
    windElement[0].innerHTML = `${data.wind.speed} km/h`;
    tempElement[0].innerHTML = `${data.main.temp}°C`;
    locationElement[0].innerHTML = data.name;

    // Update weather icon based on weather condition
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' id="city" placeholder='Enter City' />
        <div className='search-icon' onClick={search}>
          <img src={searchicons} alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>sekar wether App</div>
      <div className='data-container'>
        <div className='element'>
          <img src={four} className='icon' />
          <div className='data'>
            <div className="humidity-percentace">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind} className='icon' />
          <div className='data'>
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WetherApp;
