// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: '39427d0302504d448f6121759242905',
          q: 'Hyderabad',
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchWeather}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather details for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}:</h2>
          <p>Temperature (Celsius): {weatherData.current.temp_c}</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed (kph): {weatherData.current.wind_kph}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
