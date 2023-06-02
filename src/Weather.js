import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && weather.success !== false ? (
        <div>
          <h3>{weather.location.name}</h3>
          <p>{weather.current.weather_descriptions[0]}</p>
          <p>Temperature: {weather.current.temperature}°C</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_speed} km/h</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default Weather;
