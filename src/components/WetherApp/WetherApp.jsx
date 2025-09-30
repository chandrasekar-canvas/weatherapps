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
  const [temp, setTemp] = useState("--");
  const [location, setLocation] = useState("Enter a City");
  const [humidity, setHumidity] = useState("--");
  const [windSpeed, setWindSpeed] = useState("--");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const api_key = "876bfefd05394c4912dafc69da601b73";

  // Fetch city suggestions from OpenWeatherMap Geocoding API
  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${api_key}`;
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Fetch weather using selected place's lat/lon
  const selectPlace = async (place) => {
    setQuery(place.name);
    setSuggestions([]);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${api_key}`;
    const res = await fetch(url);
    const data = await res.json();

    setTemp(`${Math.round(data.main.temp)}°C`);
    setLocation(data.name);
    setHumidity(`${data.main.humidity}%`);
    setWindSpeed(`${data.wind.speed} km/h`);

    const iconCode = data.weather[0].icon;
    if (iconCode === "01d" || iconCode === "01n") setWicon(clear_icon);
    else if (iconCode === "02d" || iconCode === "02n") setWicon(cloud_icon);
    else if (["03d","03n","04d","04n"].includes(iconCode)) setWicon(drizzle_icon);
    else if (["09d","09n","10d","10n"].includes(iconCode)) setWicon(rain_icon);
    else if (["13d","13n"].includes(iconCode)) setWicon(snow_icon);
    else setWicon(clear_icon);
  };
  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  else if (hour >= 12 && hour < 17) return "Good Afternoon";
  else if (hour >= 17 && hour < 21) return "Good Evening";
  else return "Good Night";
};


  return (
    <>
      <section>
          <button className='search-icon'><a href="https://chandrasekarweb.netlify.app/">Back To My Portfolio</a>
"</button>
      <div className="greeting">Hi.{getGreeting()}My Name is chandrasekar.D Please Try it my wether App.</div>

      </section>
    
    <div className='container'>
    
      <section>
        <div className='top-bar'>
          <input
            type="text"
            className='cityInput'
            placeholder='Enter City'
            value={query}
            onChange={handleInputChange}
          />
          <div className='search-icon' onClick={() => query && fetchSuggestions(query)}>
            <img src={searchicons} alt="search" />
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((place, idx) => (
              <div key={idx} className="suggestion-item" onClick={() => selectPlace(place)}>
                {place.name}, {place.country}
              </div>
            ))}
          </div>
        )}

        <div className='weather-image'>
          <img src={wicon} alt="weather icon" />
        </div>
        <div className='weather-temp'>{temp}</div>
        <div className='weather-location'>{location}</div>

        <div className='data-container'>
          <div className='element'>
            <img src={four} className='icon' alt="humidity" />
            <div className='data'>
              <div className="humidity-percentace">{humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={wind} className='icon' alt="wind" />
            <div className='data'>
              <div className="wind-rate">{windSpeed}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
      </>
  );
};

export default WetherApp;



